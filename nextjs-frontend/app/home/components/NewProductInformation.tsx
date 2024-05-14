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
  };
  const formIsExpanded = isExpanded
    ? "opacity-100 z-20 translate-y-0"
    : "opacity-0 translate-y-full";
  return (
    <div
      className={`absolute w-full h-16/17 flex flex-col items-center bottom-0 pt-10 transition-all ease-in-out duration-700 ${formIsExpanded}`}
    >
      <div className="flex flex-col items-start justify-start w-11/12 h-1/3 bg-input-box-blue rounded-3xl">
        <p className="text-upload-grey p-3 text-sm"> Upload photos</p>
      </div>
    </div>
  );
};

export default NewProductInformation;
