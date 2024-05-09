"use client";
import React, { use } from "react";
import { useState } from "react";

import Sell from "./components/sell";
import SellButton from "./components/SellButton";
import Square from "./components/Square";
import MaterialInformation from "./components/MaterialInformation";

const home = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSquare = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-white relative">
      <Square isExpanded={isExpanded} />
      <div className="flex flex-col justify-center items-center">
        <SellButton onButtonClick={toggleSquare} />
      </div>
      <MaterialInformation />
    </div>
  );
};

export default home;
