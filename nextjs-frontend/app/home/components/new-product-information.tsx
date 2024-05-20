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
  quantity: string;
  price: string;
  acceptedPrice: boolean;
  audioBlob: Blob | null;
  images: UploadedImage[]; // Corrected type definition
}

async function storeDataInDatabase(
  productInformationData: ProductInformationData,
) {
  const form = new FormData();
  for (const [key, value] of Object.entries(productInformationData)) {
    switch (key) {
      case "images":
        for (const image of value) {
          form.append(image.name, image.file);
        }
        break;
      case "audioBlob":
        const audioFile = new File([value], "audio.mp4", { type: "audio/mp4" });
        form.append("audio", audioFile);
        break;
      default:
        form.append(key, value);
    }
  }
  if (FormData) {
    const response = await fetch("/api/product-upload-handler", {
      method: "POST",
      body: form,
    });
    if (response.ok) {
      console.log("Files uploaded successfully");
      // Fetch uploaded image URLs after successful upload
      const data = await response.json();
      console.log("Product ID:", data.productId);
      return data.productId;
    } else {
      console.error("Failed to upload files");
    }
  }
}

type propsType = {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
};

const NewProductInformation = ({ isExpanded, setIsExpanded }: propsType) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
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
      price: "",
      acceptedPrice: false,
    };

    setIsExpanded(false);
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
        <div className="flex flex-col w-11/12 h-1/4 bg-input-box-blue rounded-lg overflow-hidden">
          <div className="flex flex-col items-start justify-start">
            <p className="text-upload-grey p-3 text-sm"> Upload photos</p>
          </div>

          <UploadImages onSaveImages={setImages} />
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
            type="text"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="E.g 2 pallets"
            className="input rounded-lg text-m bg-input-box-blue text-white "
          />
        </label>
      </div>
      <SellButton isExpanded={isExpanded} />
    </form>
  );
};

export default NewProductInformation;
