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

  const stopRecording = () => {
    if (mediaRecorderRef.current && audioStreamRef.current) {
      mediaRecorderRef.current.stop();
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };

  const saveRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    onSaveRecording(audioBlob); // Call the parent component's function with the audio URL
    console.log("Recording saved:", audioUrl);
  };

  const deleteRecording = () => {
    setAudioChunks([]);
  };

  const playRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          recording ? stopRecording() : startRecording();
        }}
        className="btn  h-auto border-0 py-4 px-4 bg-input-box-blue border-transparent rounded-3xl shadow-md hover:bg-stark-orange transition duration-300 ease-in-out"
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
      <br />
      <div className="mt-4">
        {audioChunks.length > 0 && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              deleteRecording();
            }}
            className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Delete Recording
          </button>
        )}
        {audioChunks.length > 0 && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              saveRecording();
            }}
            className="ml-4 py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Save Recording
          </button>
        )}
        {audioChunks.length > 0 && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              playRecording();
            }}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Play Recording
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
