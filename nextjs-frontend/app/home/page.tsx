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
      <Profile pathToProfile={"https://tkpbyg.dk/media/leyd4fqj/white_logo.png"} profileName={"TKP BYG"} phone={""} email={""}  />
      <Products />
      <Square isExpanded={isExpanded} />
      <div className="flex flex-col justify-center items-center">
        <MakeASaleButton onButtonClick={toggleSquare} />
      </div>
      <ProductInformation isExpanded={isExpanded} />
    </div>
  );
};

export default Home;
