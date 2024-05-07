import React from "react";
import UploadImage from "./uploadImage2";
import Image from "next/image";

interface SellProps {
  // Define the props for the Sell component here
}

const Sell: React.FC<SellProps> = () => {
  // Implement the Sell component logic here

  return (
    <div>
      <h3>Hello from sell</h3>
      <UploadImage></UploadImage>
    </div>
  );
};

export default Sell;
