"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Square from "./components/square";
import MakeASaleButton from "./components/make-a-sale-button";
import Profile from "./components/profile";
import NewProductInformation from "./components/new-product-information";
import Products from "./components/products";

type Product = {
  id: number;
  productName: string;
  price: number;
  pathToImage: string;
};

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      productName: "Randers TEGL 307",
      pathToImage: "/Rectangle.png",
      price: 1,
    },
    {
      id: 2,
      productName: "Product 2",
      price: 200,
      pathToImage: "/Rectangle.png",
    },
    {
      id: 3,
      productName: "Product 3",
      price: 300,
      pathToImage: "/Rectangle.png",
    },
    {
      id: 4,
      productName: "Product 4",
      price: 400,
      pathToImage: "/Rectangle.png",
    },
    {
      id: 5,
      productName: "Product 5",
      price: 500,
      pathToImage: "/Rectangle.png",
    },
    {
      id: 6,
      productName: "Product 6",
      price: 600,
      pathToImage: "/Rectangle.png",
    },
    {
      id: 7,
      productName: "Product 7",
      price: 700,
      pathToImage: "/Rectangle.png",
    },
  ]);

  /*   useEffect(() => {
    // Replace this with your actual fetch function
    fetchProductsFromDatabase().then(setProducts);
  }, []); */

  const toggleSquare = () => {
    setIsExpanded(!isExpanded);
  };
  //TODO fetch products from database
  async function fetchProductsFromDatabase() {
    // Replace this with your actual fetch function
    const response = await fetch("/api/products");
    const data = await response.json();
    return data;
  }

  function removeProduct(id: number) {
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
