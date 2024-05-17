import React, { useState } from "react";
import Image from "next/image";

const images = [
  "/images/1mursten.png",
  "/images/2mursten.png",
  "/images/3mursten.png",
  "/images/4mursten.png",
];

const Images: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel h-full w-full relative">
      <div className="carousel-item w-full">
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex}`}
          width={100}
          height={100}
          objectFit="cover"
          className="rounded-lg w-full"
        />
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-500"
        onClick={handlePrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4.29593 11.9999L12.7879 3.27291C12.8578 3.20258 12.9131 3.11908 12.9506 3.02725C12.988 2.93542 13.0068 2.83708 13.006 2.73791C13.0052 2.63875 12.9847 2.54073 12.9458 2.44953C12.9068 2.35833 12.8501 2.27577 12.7791 2.20661C12.708 2.13745 12.6239 2.08308 12.5317 2.04663C12.4395 2.01018 12.3409 1.99239 12.2418 1.99428C12.1426 1.99616 12.0448 2.0177 11.954 2.05763C11.8633 2.09756 11.7813 2.1551 11.7129 2.22691L2.71293 11.4769C2.57671 11.6169 2.50049 11.8046 2.50049 11.9999C2.50049 12.1953 2.57671 12.3829 2.71293 12.5229L11.7129 21.7729C11.7813 21.8447 11.8633 21.9023 11.954 21.9422C12.0448 21.9821 12.1426 22.0037 12.2418 22.0055C12.3409 22.0074 12.4395 21.9896 12.5317 21.9532C12.6239 21.9167 12.708 21.8624 12.7791 21.7932C12.8501 21.724 12.9068 21.6415 12.9458 21.5503C12.9847 21.4591 13.0052 21.3611 13.006 21.2619C13.0068 21.1627 12.988 21.0644 12.9506 20.9726C12.9131 20.8807 12.8578 20.7972 12.7879 20.7269L4.29593 11.9999Z"
            fill="#545454"
          />
        </svg>
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rotate-180deg hover:bg-gray-500"
        onClick={handleNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4.29593 11.9999L12.7879 3.27291C12.8578 3.20258 12.9131 3.11908 12.9506 3.02725C12.988 2.93542 13.0068 2.83708 13.006 2.73791C13.0052 2.63875 12.9847 2.54073 12.9458 2.44953C12.9068 2.35833 12.8501 2.27577 12.7791 2.20661C12.708 2.13745 12.6239 2.08308 12.5317 2.04663C12.4395 2.01018 12.3409 1.99239 12.2418 1.99428C12.1426 1.99616 12.0448 2.0177 11.954 2.05763C11.8633 2.09756 11.7813 2.1551 11.7129 2.22691L2.71293 11.4769C2.57671 11.6169 2.50049 11.8046 2.50049 11.9999C2.50049 12.1953 2.57671 12.3829 2.71293 12.5229L11.7129 21.7729C11.7813 21.8447 11.8633 21.9023 11.954 21.9422C12.0448 21.9821 12.1426 22.0037 12.2418 22.0055C12.3409 22.0074 12.4395 21.9896 12.5317 21.9532C12.6239 21.9167 12.708 21.8624 12.7791 21.7932C12.8501 21.724 12.9068 21.6415 12.9458 21.5503C12.9847 21.4591 13.0052 21.3611 13.006 21.2619C13.0068 21.1627 12.988 21.0644 12.9506 20.9726C12.9131 20.8807 12.8578 20.7972 12.7879 20.7269L4.29593 11.9999Z"
            fill="#545454"
          />
        </svg>
      </button>
    </div>
  );
};

export default Images;
