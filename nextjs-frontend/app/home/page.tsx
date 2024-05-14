"use client";
import React, { use } from "react";
import { useState } from "react";

import Square from "./components/Square";
import MakeASaleButton from "./components/MakeASaleButton";
import SellButton from "./components/SellButton";
import ProductInformation from "./components/ProductInformation";
import Products from "./components/products";
import Profile from "./components/profile";

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSquare = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-white overflow-y-hidden z-0">
      <Profile
        pathToProfile={"/image.png"}
        profileName={"TKP BYG"}
        phone={"12345678"}
        email={"johnDoe@tkpbyg.dk"}
      />
      <h4 className="text-black font-semibold card-title">Mail Box: </h4>
      {!isExpanded && (
        <div className="flex flex-col flex-wrap">
          <Products pathToImage="/Rectangle.png" productName="Randers TEGL 307" price={1} />
          <Products pathToImage="/Rectangle.png" productName="Randers TEGL 307" price={1} />
          <Products pathToImage="/Rectangle.png" productName="Randers TEGL 307" price={1} />
          <Products pathToImage="/Rectangle.png" productName="Randers TEGL 307" price={1} />
        </div>
      )}

      <Square isExpanded={isExpanded} />
      <div className="flex flex-col justify-center items-center">
        <MakeASaleButton onButtonClick={toggleSquare} />
      </div>

      <ProductInformation isExpanded={isExpanded} />
    </div>
  );
};

export default Home;
