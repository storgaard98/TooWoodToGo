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
        className="py-2 px-4 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out"
      >
        {recording ? "Stop Recording" : "Start Recording"}
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
