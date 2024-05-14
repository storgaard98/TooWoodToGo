"use client";
import React from "react";
import { useState } from "react";

import Square from "./components/Square";
import MakeASaleButton from "./components/MakeASaleButton";
import SellButton from "./components/SellButton";
import ProductInformation from "./components/ProductInformation";
import Products from "./components/Products";
import Profile from "./components/profile";
import NewProductInformation from "./components/NewProductInformation";

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSquare = () => {
    setIsExpanded(!isExpanded);
  };

  //TODO have an empty product so the scroll effects looks cool. Alternative use h-57% instead in the div that wraps the products
  //Removed         {!isExpanded && ( )} from the div that wraps the products - the p-tag
  return (
    <div className="relative flex flex-col h-screen w-screen bg-white items-center overflow-y-hidden">
      <div className="flex flex-col p-2 h-full z-10">
        <Profile
          pathToProfile={"/image.png"}
          profileName={"TKP BYG"}
          phone={"12345678"}
          email={"johnDoe@tkpbyg.dk"}
        />
        <h1 className="pl-2">Mail Box: </h1>
        <p></p>
        <div className="flex flex-col justify-start w-full h-full% overflow-y-auto">
          <Products
            pathToImage="/Rectangle.png"
            productName="Randers TEGL 307"
            price={1}
          />
          <Products
            pathToImage="/Rectangle.png"
            productName="Randers TEGL 307"
            price={1}
          />
          <Products
            pathToImage="/Rectangle.png"
            productName="Randers TEGL 307"
            price={1}
          />
          <Products
            pathToImage="/Rectangle.png"
            productName="Randers TEGL 307"
            price={1}
          />
          <Products
            pathToImage="/Rectangle.png"
            productName="Randers TEGL 307"
            price={1}
          />
          <Products
            pathToImage="/Rectangle.png"
            productName="Randers TEGL 307"
            price={1}
          />
          <Products
            pathToImage="/Rectangle.png"
            productName="Randers TEGL 307"
            price={1}
          />
        </div>
      </div>

      <Square isExpanded={isExpanded} />
      <div className="absolute flex flex-col bottom-10 justify-center items-center">
        <MakeASaleButton onButtonClick={toggleSquare} />
      </div>
      <NewProductInformation isExpanded={isExpanded} />
    </div>
  );
};

export default Home;
