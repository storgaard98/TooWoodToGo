"use client";
import React, { use } from "react";
import { useState } from "react";

import Square from "./components/Square";
import MaterialInformation from "./components/MaterialInformation";
import MakeASaleButton from "./components/MakeASaleButton";
import SellButton from "./components/SellButton";

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
      <MaterialInformation isExpanded={isExpanded} />
      <SellButton isExpanded={isExpanded} />
    </div>
  );
};

export default home;
