"use client";
import React, { useState } from "react";
import SellButton from "./sell-button";
import AudioRecorder from "./audio-recorder";
import UploadImages from "./upload-Images";

// Rest of the code

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

const ProductInformation = ({ isExpanded }: propsType) => {
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

  const formIsExpanded = isExpanded ? "opacity-100" : "opacity-0";

  //TODO: Remove the ugly arrows in the quantity input field
  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`flex flex-col w-full items-stretch absolute z-10 transition-all ease-in-out duration-700 ${formIsExpanded}`}
      >
        <div className=" flex flex-col justify-center items-center h-1/2 bg-input-box-blue rounded-3xl ">
          <p className="text-upload-grey">Upload up to 6 photos</p>
        </div>
        <label htmlFor="productName" className="form-control  pt-6 w-11/12">
          <div className="label">
            <span className="label-text text-white text-4xl">Product Name</span>
          </div>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="input rounded-3xl text-5xl h-32 bg-input-box-blue text-white pl-10"
          />
        </label>
        <label htmlFor="description" className="form-control  pt-6 w-11/12">
          <div className="label">
            <span className="label-text text-white text-4xl">
              Make a description
            </span>
          </div>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input rounded-3xl text-5xl h-72 bg-input-box-blue text-white p-6 pr-205px"
          />
          <div className="absolute right-16 pt-28">
            <AudioRecorder onSaveRecording={setAudioBlob} />
          </div>
        </label>
        <label htmlFor="quantity" className="form-control  pt-6 w-11/12">
          <div className="label">
            <span className="label-text text-white text-4xl">Quantity</span>
          </div>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="input rounded-3xl text-5xl h-32 bg-input-box-blue text-white pl-10"
          />
        </label>
      </div>
      <SellButton isExpanded={isExpanded} />
    </form>
  );
};

export default ProductInformation;
