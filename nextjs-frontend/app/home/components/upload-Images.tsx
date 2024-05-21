import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";

interface UploadedImage {
  file: File;
  name: string;
}

interface UploadImagesProps {
  uploadedImages: UploadedImage[];
  setUploadedImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

const UploadImages = (props: UploadImagesProps) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);

      const newUploadedImages: UploadedImage[] = selectedFiles.map((file) => ({
        file: file,
        name: file.name,
      }));

      props.setUploadedImages([...props.uploadedImages, ...newUploadedImages]);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...props.uploadedImages];
    updatedImages.splice(index, 1);
    props.setUploadedImages(updatedImages);
  };

  return (
    <div>
      {props.uploadedImages.length == 0 ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <label
            htmlFor="image_uploads"
            className="flex flex-col items-center justify-center w-1/2 h-2/3 rounded-md shadow-md border-white border cursor-pointer hover:bg-white hover:bg-opacity-20 transition-colors duration-300 ease-in-out z-20"
          >
            <p className="text-white text-sm p-3">+ tilføj billeder</p>
          </label>
          <input
            type="file"
            id="image_uploads"
            name="image_uploads"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-start items-center">
            <label
              htmlFor="image_uploads"
              className="flex justify-center items-center w-1/2 rounded-lg shadow-md border-white border hover:bg-white hover:bg-opacity-20 transition-colors duration-300 ease-in-out z-20"
            >
              <p className="flex text-white text-sm p-1">
                + tilføj flere billeder
              </p>
            </label>
          </div>
          <input
            type="file"
            id="image_uploads"
            name="image_uploads"
            multiple
            onChange={handleFileChange}
            className="opacity-0"
          />
        </div>
      )}
      <div className="carousel gap-3 mt-[-20px] ">
        {/* Display selected file names */}
        {props.uploadedImages.map((image, index) => (
          <div key={index} className="relative carousel-item rounded-sm ">
            {/*<div className="">{image.name}</div>*/}
            <Image
              src={URL.createObjectURL(image.file)}
              alt={`Uploaded image ${index}`}
              className="flex object-scale-down h-30 w-20 rounded-lg"
              width={100}
              height={100}
              /*onClick={() => openModal(index)}*/
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 m-1 w-5 h-5 bg-cross-red rounded-full flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M3.53555 3.53554C6.36398 6.36397 9.42811 9.42809 10.6066 10.6066"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6066 3.53554C7.77817 6.36396 4.71404 9.42809 3.53553 10.6066"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImages;
