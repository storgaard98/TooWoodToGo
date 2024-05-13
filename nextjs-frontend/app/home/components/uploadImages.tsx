import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";

interface UploadImagesProps {
  onSaveImages: (images: UploadedImage[]) => void;
}

interface UploadedImage {
  file: File;
  name: string;
}

const UploadImages: React.FC<UploadImagesProps> = ({ onSaveImages }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImageIndex(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);

      const newUploadedImages: UploadedImage[] = selectedFiles.map((file) => ({
        file: file,
        name: file.name,
      }));

      setUploadedImages([...uploadedImages, ...newUploadedImages]);
      onSaveImages([...uploadedImages, ...newUploadedImages]);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
    onSaveImages(updatedImages);
  };

  return (
    <div>
      {uploadedImages.length == 0 ? (
        <div>
          <div className="flex justify-center pt-32">
            <label
              htmlFor="image_uploads"
              className="flex w-1/2 h-28 items-center justify-center text-white rounded-lg shadow-md text-4xl border-white border-2 cursor-pointer hover:bg-white hover:bg-opacity-20 transition-colors duration-300 ease-in-out z-50"
            >
              + upload photos
            </label>
          </div>
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
          <div className="flex justify-center items-center pb-10">
            <label
              htmlFor="image_uploads"
              className="flex justify-center items-center w-3/4 h-20 text-white rounded-lg shadow-md text-4xl border-white border-2 hover:bg-white hover:bg-opacity-20 transition-colors duration-300 ease-in-out"
            >
              + upload more photos
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
      <div className="carousel gap-4 ">
        {/* Display selected file names */}
        {uploadedImages.map((image, index) => (
          <div key={index} className="relative carousel-item rounded-xl ">
            {/*<div className="">{image.name}</div>*/}
            <Image
              src={URL.createObjectURL(image.file)}
              alt={`Uploaded image ${index}`}
              className=" flex object-cover rounded-xl w-64 h-100"
              width={100}
              height={100}
              /*onClick={() => openModal(index)}*/
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 mt-1 mr-1 px-2 py-1 bg-red-500 text-white rounded-full text-xs"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImages;
