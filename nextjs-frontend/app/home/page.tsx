"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Square from "./components/square";
import MakeASaleButton from "./components/make-a-sale-button";
import Profile from "./components/profile";
import NewProductInformation from "./components/new-product-information";
import Products from "./components/products";

type Product = {
  id: string;
  productName: string;
  price: string;
  pathToImage: string;
};

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

     useEffect(() => {
    // Replace this with your actual fetch function
    fetchProductsFromDatabase().then(setProducts);
  }, []);

  const toggleSquare = () => {
    setIsExpanded(!isExpanded);
  };
  async function fetchProductsFromDatabase() {
    // Replace this with your actual fetch function
    const response = await fetch("/api/collect-products");
    const data = await response.json();
    return data;
  }

  function removeProduct(id: string) {
    console.log("Product removed");
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  }

  //TODO have an empty product so the scroll effects looks cool. Alternative use h-57% instead in the div that wraps the products
  //Removed         {!isExpanded && ( )} from the div that wraps the products - the p-tag
  return (
    <>
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
            {products.map((product) => (
              <Products
                key={product.id}
                {...product}
                removeProduct={removeProduct}
              />
            ))}
          </div>
        </div>

        <Square isExpanded={isExpanded} />
        <div className="absolute flex flex-col bottom-10 justify-center items-center">
          <MakeASaleButton onButtonClick={toggleSquare} />
        </div>
      </div>
      <NewProductInformation isExpanded={isExpanded} />
    </>
  );
};

export default Home;
