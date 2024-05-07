import React from "react";
import Sell from "./components/sell";
import SellButton from "./components/SellButton";
import Square from "./components/Square";

const home = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-white relative">
      <Square></Square>
      <SellButton></SellButton>
    </div>
  );
};

export default home;
