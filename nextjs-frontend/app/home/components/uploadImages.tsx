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
    null,
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
    <div className="my-4">
      <div className="mb-4">
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Display selected file names */}
        {uploadedImages.map((image, index) => (
          <div key={index} className="relative">
            <div className="mb-2">{image.name}</div>
            <Image
              src={URL.createObjectURL(image.file)}
              alt={`Uploaded image ${index}`}
              className="cursor-pointer"
              width={100}
              height={100}
              onClick={() => openModal(index)}
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 mt-1 mr-1 px-2 py-1 bg-red-500 text-white rounded-full text-xs"
            >
              Remove
            </button>
          </div>
        ))}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Image Modal"
        >
          {selectedImageIndex !== null && (
            <Image
              src={URL.createObjectURL(uploadedImages[selectedImageIndex].file)}
              alt={`Uploaded image ${selectedImageIndex}`}
              width={500}
              height={500}
            />
          )}
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 m-4 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default UploadImages;