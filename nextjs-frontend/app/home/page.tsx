"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Square from "./components/square";
import MakeASaleButton from "./components/make-a-sale-button";
import Profile from "./components/profile";
import NewProductInformation from "./components/new-product-information";
import Products from "./components/products";
import Image from "next/image";

type Product = {
  id: string;
  productName: string;
  description: string;
  quantity: string;
  pathToImage: string;
  price: string;
};

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProductsFromDatabase().then(setProducts);
  }, [isExpanded]);

  const toggleSquare = () => {
    setIsExpanded(!isExpanded);
  };

  async function fetchProductsFromDatabase() {
    try {
      const response = await fetch("/api/fetch-products-handler");
      if (!response.ok) {
        throw new Error("Failed to fetch products from the database");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
  function addProduct(product: Product) {
    setProducts([...products, product]);
  }

  function removeProduct(productId: string) {
    console.log("Product removed with productId: ", productId);
    const updatedProducts = products.filter(
      (product) => product.id !== productId,
    );
    setProducts(updatedProducts);
    fetch("/api/remove-product-handler/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: productId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  //Removed         {!isExpanded && ( )} from the div that wraps the products - the p-tag
  return (
    <>
      <div
        className="relative flex flex-col h-screen w-screen bg-white items-center overflow-y-hidden"
        style={{ overscrollBehavior: "none" }}
      >
        <div className="flex flex-col p-2 h-full z-10">
          <Profile
            pathToProfile={"/image.png"}
            profileName={"TKP BYG"}
            phone={"12345678"}
            email={"johnDoe@tkpbyg.dk"}
          />
          <h1 className="pl-2">Mail Box: </h1>
          {products.length > 0 ? (
            <div className="flex flex-col justify-start w-full h-full% overflow-y-auto h-57% rounded-3xl ">
              {products.map((product) => (
                <Products
                  key={product.id}
                  {...product}
                  removeProduct={removeProduct}
                />
              ))}
            </div>
          ) : (
            noProductsMessage
          )}
        </div>

        <Square isExpanded={isExpanded} />
        <div className="absolute flex flex-col bottom-10 justify-center items-center overflow-y-hidden">
          <MakeASaleButton onButtonClick={toggleSquare} />
        </div>
      </div>
      <NewProductInformation
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    </>
  );
};

const noProductsMessage = (
  <div className="flex flex-col justify-start w-full h-full% overflow-y-auto">
    <div className="flex flex-col bg-product-blue rounded-2xl shadow-product-box m-2 items-center justify-center">
      <h2 className="text-center text-xl text-stark-blue text-bold m-2">
        You have no products for sale
      </h2>
      <h2 className="text-center text-m text-stark-blue text-bold m-2">
        Join the club, set product for sale{" "}
      </h2>
      <h2 className="text-center text-m text-stark-blue text-bold m-2">
        and save the environment
      </h2>
      <Image
        src="/stark-man.png"
        alt="Small STARK logo"
        className="bg-stark-orange m-2 rounded-xl "
        width={80}
        height={80}
      />
    </div>
  </div>
);

export default Home;
