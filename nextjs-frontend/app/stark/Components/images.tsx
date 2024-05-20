import React, { use, useEffect, useState } from "react";
import Image from "next/image";

interface ImagesProps {
  imagePaths: string[];
}

const Images: React.FC<ImagesProps> = ({ imagePaths }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [imagePaths]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagePaths.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="carousel h-full w-full relative">
      <div className="carousel-item w-full">
        <Image
          src={imagePaths[currentIndex]}
          alt={`Image ${currentIndex}`}
          width={100}
          height={100}
          objectFit="cover"
          className="rounded-lg w-full h-full object-cover"
        />
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-500"
        onClick={handlePrev}
      >
        {/* Previous button SVG */}
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rotate-180deg hover:bg-gray-500"
        onClick={handleNext}
      >
        {/* Next button SVG */}
      </button>
    </div>
  );
};

export default Images;
