"use client";
import React, { useState } from "react";
import SellButton from "./sell-button";
import AudioRecorder from "./audio-recorder";
import UploadImages from "./upload-Images";

interface FormSellProps {
  onSubmit: (productInformationData: ProductInformationData) => void;
}

interface UploadedImage {
  file: File;
  name: string; // Alt text for accessibility
  // Add more properties as needed
}

interface ProductInformationData {
  productName: string;
  description: string;
  quantity: number;
  audioBlob: Blob | null;
  images: UploadedImage[]; // Corrected type definition
}

//TODO make sure that description is passed as a string
async function storeDataInDatabase(
  productInformationData: ProductInformationData,
) {
  const form = new FormData();
  for (const [key, value] of Object.entries(productInformationData)) {
    if (key !== "images") {
      form.append(key, value);
    } else {
      for (const image of value) {
        form.append(image.name, image.file);
      }
    }
  }
  if (FormData) {
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
}

type propsType = { isExpanded: boolean };

const NewProductInformation = ({ isExpanded }: propsType) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [images, setImages] = useState<UploadedImage[]>([]); // Corrected type definition

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productInformationData: ProductInformationData = {
      productName,
      description,
      quantity,
      audioBlob,
      images,
    };

    console.log("Submit ", productInformationData);
    storeDataInDatabase(productInformationData);
  };
  const formIsExpanded = isExpanded
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-full";
  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`absolute w-full h-16/17 flex flex-col items-center bottom-0 pt-10 transition-all ease-in-out duration-700 z-20 ${formIsExpanded}`}
      >
        <div className="flex flex-col items-start justify-start w-11/12 h-1/4 bg-input-box-blue rounded-lg">
          <p className="text-upload-grey p-3 text-sm"> Upload photos</p>
        </div>
        <label htmlFor="productName" className="form-control w-11/12">
          <div className="label">
            <span className="label-text text-white text-sm">Product Name</span>
          </div>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="input rounded-lg text-m bg-input-box-blue text-white"
          />
        </label>
        <label
          htmlFor="description"
          className="form-control w-11/12 h-1/4 flex flex-col"
        >
          <div className="label">
            <span className="label-text text-white text-sm">
              Make a description
            </span>
          </div>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input rounded-lg text-m h-full bg-input-box-blue text-white pr-28"
          />
          <div className="absolute right-5 mt-10">
            <AudioRecorder onSaveRecording={setAudioBlob} />
          </div>
        </label>
        <label htmlFor="quantity" className="form-control w-11/12">
          <div className="label">
            <span className="label-text text-white text-sm ">Quantity</span>
          </div>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="input rounded-lg text-lg h-full bg-input-box-blue text-white "
          />
        </label>
      </div>
    </form>
  );
};

export default NewProductInformation;
