// AudioRecorder.tsx
import React, { useState, useRef } from "react";

interface AudioRecorderProps {
  onSaveRecording: (audioBlob: Blob) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSaveRecording }) => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const [isButtonShowed, setButtonShowed] = useState<boolean>(false);

  const startRecording = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      audioStreamRef.current = audioStream;

      const mediaRecorder = new MediaRecorder(audioStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        setAudioChunks((chunks) => [...chunks, event.data]);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && audioStreamRef.current) {
      mediaRecorderRef.current.stop();
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };

  const saveRecording = () => {
    if (audioChunks.length === 0) return console.log("No recording to save");
    const audioBlob = new Blob(audioChunks, { type: "audio/mp4" });
    const audioUrl = URL.createObjectURL(audioBlob);
    onSaveRecording(audioBlob); // Call the parent component's function with the audio URL
    console.log("Recording saved:", audioUrl);
    return;
  };

  const deleteRecording = async () => {
    setAudioChunks([]);
    saveRecording();
  };

  const playRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/mp4" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    console.log("Playing recording:", audioUrl);
    audio.play();
  };

  return (
    <div>
      {audioChunks.length > 0 && (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            saveRecording();
          }}
          className={`btn h-auto border-0 bg-input-box-blue border-transparent rounded-3xl shadow-md hover:bg-stark-orange transition duration-200 ease-in-out ${recording ? "bg-stark-orange" : "bg-input-box-blue"} transform -translate-y-6`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="150"
            viewBox="0 0 24 24"
            fill="#007BFF"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 3h12l1.707 1.707L21 7v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v4h10V5H7zm2 6v2h2v-2H9zm2 3v2h2v-2h-2z" />
          </svg>
        </button>
      )}
      {audioChunks.length < 1 && (
        <button
          type="button"
          onClick={async (event) => {
            event.preventDefault();
            recording ? stopRecording() : startRecording();
            recording ? setButtonShowed(true) : setButtonShowed(false);
          }}
          className={`btn h-auto border-0 bg-input-box-blue border-transparent rounded-3xl shadow-md hover:bg-stark-orange transition duration-200 ease-in-out ${recording ? "bg-stark-orange" : "bg-input-box-blue"} transform -translate-y-6`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            viewBox="0 0 44 44"
            fill="none"
          >
            <path
              d="M22 30.25C24.1873 30.2477 26.2844 29.3778 27.8311 27.8311C29.3778 26.2844 30.2477 24.1873 30.25 22V11C30.25 8.81196 29.3808 6.71354 27.8336 5.16637C26.2865 3.61919 24.188 2.75 22 2.75C19.812 2.75 17.7135 3.61919 16.1664 5.16637C14.6192 6.71354 13.75 8.81196 13.75 11V22C13.7523 24.1873 14.6222 26.2844 16.1689 27.8311C17.7156 29.3778 19.8127 30.2477 22 30.25ZM16.5 11C16.5 9.54131 17.0795 8.14236 18.1109 7.11091C19.1424 6.07946 20.5413 5.5 22 5.5C23.4587 5.5 24.8576 6.07946 25.8891 7.11091C26.9205 8.14236 27.5 9.54131 27.5 11V22C27.5 23.4587 26.9205 24.8576 25.8891 25.8891C24.8576 26.9205 23.4587 27.5 22 27.5C20.5413 27.5 19.1424 26.9205 18.1109 25.8891C17.0795 24.8576 16.5 23.4587 16.5 22V11ZM23.375 35.6813V41.25C23.375 41.6147 23.2301 41.9644 22.9723 42.2223C22.7144 42.4801 22.3647 42.625 22 42.625C21.6353 42.625 21.2856 42.4801 21.0277 42.2223C20.7699 41.9644 20.625 41.6147 20.625 41.25V35.6813C17.235 35.3363 14.0933 33.7466 11.8075 31.2195C9.52174 28.6924 8.25419 25.4075 8.25 22C8.25 21.6353 8.39487 21.2856 8.65273 21.0277C8.91059 20.7699 9.26033 20.625 9.625 20.625C9.98967 20.625 10.3394 20.7699 10.5973 21.0277C10.8551 21.2856 11 21.6353 11 22C11 24.9174 12.1589 27.7153 14.2218 29.7782C16.2847 31.8411 19.0826 33 22 33C24.9174 33 27.7153 31.8411 29.7782 29.7782C31.8411 27.7153 33 24.9174 33 22C33 21.6353 33.1449 21.2856 33.4027 21.0277C33.6606 20.7699 34.0103 20.625 34.375 20.625C34.7397 20.625 35.0894 20.7699 35.3473 21.0277C35.6051 21.2856 35.75 21.6353 35.75 22C35.7458 25.4075 34.4783 28.6924 32.1925 31.2195C29.9067 33.7466 26.765 35.3363 23.375 35.6813Z"
              fill="#007BFF"
            />
          </svg>
        </button>
      )}
      <div
        className={`flex flex-row space-x-5 transform transition-opacity ease-in-out duration-700 ${isButtonShowed ? "opacity-100" : "opacity-0"}`}
      >
        {audioChunks.length > 0 && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              deleteRecording();
            }}
            className="flex items-center justify-center rounded-lg shadow-md hover:bg-white hover:bg-opacity-50 hover:border-white hover:border-2 transition w-20 h-20 -translate-y-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 25 31"
              fill="none"
            >
              <path
                d="M25 5.81353H23.0769V28.0939C23.0769 28.4975 23.0018 28.8759 22.8516 29.2291C22.7013 29.5823 22.496 29.89 22.2356 30.1524C21.9752 30.4147 21.6697 30.6216 21.3191 30.773C20.9685 30.9243 20.5929 31 20.1923 31H4.80769C4.40705 31 4.03145 30.9243 3.68089 30.773C3.33033 30.6216 3.02484 30.4147 2.76442 30.1524C2.50401 29.89 2.29868 29.5823 2.14844 29.2291C1.9982 28.8759 1.92308 28.4975 1.92308 28.0939V5.81353H0V3.8761H7.69231V1.93868C7.69231 1.66623 7.74239 1.41396 7.84255 1.18188C7.94271 0.949791 8.07792 0.747976 8.2482 0.576433C8.41847 0.404891 8.6238 0.26362 8.86418 0.152622C9.10457 0.0416243 9.35497 -0.00882939 9.61538 0.00126134H15.3846C15.655 0.00126134 15.9054 0.051715 16.1358 0.152622C16.3662 0.25353 16.5665 0.389755 16.7368 0.561297C16.9071 0.73284 17.0473 0.9397 17.1575 1.18188C17.2676 1.42406 17.3177 1.67632 17.3077 1.93868V3.8761H25V5.81353ZM9.61538 3.8761H15.3846V1.93868H9.61538V3.8761ZM21.1538 5.81353H3.84615V28.0939C3.84615 28.3562 3.94131 28.5833 4.13161 28.775C4.32191 28.9667 4.54728 29.0626 4.80769 29.0626H20.1923C20.4527 29.0626 20.6781 28.9667 20.8684 28.775C21.0587 28.5833 21.1538 28.3562 21.1538 28.0939V5.81353ZM9.61538 25.1877H7.69231V9.68837H9.61538V25.1877ZM13.4615 25.1877H11.5385V9.68837H13.4615V25.1877ZM17.3077 25.1877H15.3846V9.68837H17.3077V25.1877Z"
                fill="#007BFF"
              />
            </svg>
          </button>
        )}
        {audioChunks.length > 0 && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              playRecording();
            }}
            className="flex items-center justify-center rounded-lg shadow-md hover:bg-white hover:bg-opacity-50 hover:border-white hover:border-2 transition w-20 h-20 -translate-y-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 21 25"
              fill="none"
            >
              <path
                d="M20.0953 10.8765L2.90212 0.283045C2.61225 0.104267 2.28025 0.00666837 1.94041 0.000329735C1.60057 -0.0060089 1.26521 0.0791419 0.968965 0.246988C0.675543 0.412227 0.431113 0.653203 0.260814 0.945133C0.090514 1.23706 0.000490279 1.56941 0 1.908V23.0926C0.00221092 23.6005 0.204573 24.0867 0.562601 24.4444C0.920629 24.8021 1.40502 25.0019 1.90929 25C2.26126 24.9998 2.6064 24.9021 2.90689 24.7175L20.0953 14.1241C20.3716 13.9544 20.5999 13.7161 20.7583 13.432C20.9168 13.1478 21 12.8274 21 12.5015C21 12.1756 20.9168 11.8552 20.7583 11.571C20.5999 11.2869 20.3716 11.0486 20.0953 10.8789V10.8765ZM1.90929 23.0697V1.92363L19.0726 12.5003L1.90929 23.0697Z"
                fill="#007BFF"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
