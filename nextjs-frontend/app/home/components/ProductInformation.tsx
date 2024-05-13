"use client";
import React, { useState } from "react";
import SellButton from "./SellButton";
import AudioRecorder from "./audioRecorder";
import UploadImages from "./uploadImages";

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
  };

  const formIsExpanded = isExpanded
    ? "opacity-100 pt-52"
    : "opacity-0 pt-2080px";

  //TODO: Remove the ugly arrows in the quantity input field
  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`flex flex-col w-full items-center absolute z-10 transition-all ease-in-out duration-700 ${formIsExpanded}`}
      >
        <div className=" h-600px bg-input-box-blue rounded-70px w-11/12">
          <p className="text-upload-grey text-4xl p-11">
            Upload up to 6 photos
          </p>
          <UploadImages onSaveImages={setImages} />
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
