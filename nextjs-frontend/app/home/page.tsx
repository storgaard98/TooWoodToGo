"use client";
import React, { use } from "react";
import { useState } from "react";

import Square from "./components/Square";
import MakeASaleButton from "./components/MakeASaleButton";
import SellButton from "./components/SellButton";
import ProductInformation from "./components/ProductInformation";

const home = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSquare = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-white relative">
      <Square isExpanded={isExpanded} />
      <div className="flex flex-col justify-center items-center">
        <MakeASaleButton onButtonClick={toggleSquare} />
      </div>
      <ProductInformation isExpanded={isExpanded} />
      <SellButton isExpanded={isExpanded} />
    </div>
  );
};

export default home;
