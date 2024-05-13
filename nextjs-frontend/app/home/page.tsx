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
    <div className="h-screen w-screen flex flex-col bg-white relative">
    {isExpanded ? (
  <div className="transition-all ease-in-out duration-500 opacity-0 invisible">
  </div>
) : (
  <div className="transition-all ease-in-out duration-500 opacity-100 visible">
    <Profile pathToProfile={"https://tkpbyg.dk/media/leyd4fqj/white_logo.png"} profileName={"TKP BYG"} phone={"12345678"} email={"johnDoe@tkpbyg.dk"}  />
    <h2 className="text-black font-semibold card-title text-4xl py-6">Mail Box: </h2>
    <Products pathToImage="" productName="Randers TEGL 307" price={1}/>
    <Products pathToImage="" productName="Randers TEGL 307" price={1}/>
    <Products pathToImage="" productName="Randers TEGL 307" price={1}/>
    <Products pathToImage="" productName="Randers TEGL 307" price={1}/>
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
