"use client";
import React, { useState } from "react";
import AudioRecorder from "./audioRecorder";
import UploadImages from "./uploadImages";

interface FormSellProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  title: string;
  description: string;
  quantity: number;
  audioBlob: Blob | null;
  images: UploadedImage[]; // Corrected type definition
}

interface UploadedImage {
  file: File;
  name: string; // Alt text for accessibility
  // Add more properties as needed
}

const FormSell = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [images, setImages] = useState<UploadedImage[]>([]); // Corrected type definition

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: FormData = {
      title,
      description,
      quantity,
      audioBlob,
      images,
    };
    console.log("Submit ", formData);
    sendDataToServer(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <UploadImages onSaveImages={setImages} />
      <label htmlFor="title">Title:</label>
      <br />

      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label htmlFor="description">Description:</label>
      <br />
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <br />

      <AudioRecorder onSaveRecording={setAudioBlob} />
      <br />

      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

async function sendDataToServer(formData: FormData) {
  const form = new FormData();
  for (const [key, value] of Object.entries(formData)) {
    form.append(key, value);
  }

  const response = await fetch("/api/formDataSell", {
    method: "POST",
    body: form,
  });

  if (response.ok) {
    console.log("Files uploaded successfully");
    // Fetch uploaded image URLs after successful upload
    const data = await response.json();
  } else {
    console.error("Failed to upload files");
  }
}

export default FormSell;
