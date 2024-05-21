"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import Buttons from "./buttons";
import Images from "./images";
import Modal from "./modal";

type propsType = { productID: string };

interface ProductInformation {
  price: number;
}

interface Product {
  productName: string;
  date: string;
  company: string;
  email: string;
  phone: string;
  quantity: string;
  description: string;
  pathToImages: string[];
  pathToAudio: string;
  price: string;
  acceptedPrice: boolean;
}

const ProductInformation = ({ productID }: propsType) => {
  const [price, setPrice] = useState(0);
  const [isPrice, setIsPrice] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null); // define audioRef here

  useEffect(() => {
    getProductInformation(productID);
  }, [productID]);

  async function getProductInformation(productID: string) {
    const response = await fetch(
      `/api/fetch-product-by-id-handler?productId=${productID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Server response was not ok");
    }
    const product: Product = await response.json();
    console.log("Path to audio", product.pathToAudio);
    setProduct(product);
  }

  const info = {
    company: "TKP BYG A/S",
    email: "ByggeMandBob@tkpbyg.dk",
    phone: "12345678",
  };

  const onRejectClick = () => {
    setShowModal(product ? true : false);
    product ? true : console.log("Product is false");
  };

  const onAcceptClick = () => {
    {
      price > 0 ? setIsPrice(true) : setIsPrice(false);
      if (isPrice === false) {
        fetch("/api/update-price-status-handler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Accept", id: productID }),
        });
      }
      fetch("/api/set-price-product-handler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price, id: productID }),
      });
    }
  };

  function rejectProduct(): void {
    console.log("Product rejected");
    setShowModal(false);
  }

  const playRecording = async () => {
    try {
      if (audioRef.current && product?.pathToAudio) {
        audioRef.current.src = product.pathToAudio;
        if (audioRef.current.canPlayType("audio/mp4")) {
          // check if the audio format is supported
          await audioRef.current.play();
        } else {
          console.error("Audio format not supported");
        }
      }
    } catch (error) {
      console.error("Error playing the audio:", error);
    }
  };
  return (
    <>
      <div className="flex w-full h-full p-2">
        {product?.description ? (
          <>
            <div className="flex flex-row w-1/2 h-full rounded-xl pr-2 ">
              {product.pathToImages && product.pathToImages.length > 0 ? (
                <Images imagePaths={product.pathToImages}></Images>
              ) : (
                <Images imagePaths={["/no-image.jpg"]}></Images>
              )}
            </div>
            <div className="flex flex-col w-1/2 h-full justify-between rounded-xl pl-2 ">
              <div className="flex flex-col">
                <div className="text-stark-blue text-3xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-medium">
                  {product.productName}
                </div>
                <div>
                  <p className="text-stark-blue text-sm font-light">
                    Oprettet {product.date} af {info.company}
                  </p>
                </div>
                <div>
                  <p className="text-stark-blue text-sm font-light">
                    Email: {info.email} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Telefonnummer: {info.phone}
                  </p>
                </div>
                <div className="text-stark-blue text-4xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl pt-5% font-light">
                  {product.quantity}
                </div>
                <div className="pt-20%">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-stark-blue text-sm font-light">
                        Beskrivelse af produktet:
                      </p>
                      <p className="text-sm font-light text-black">
                        {product.description}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <button
                        type="button"
                        onClick={playRecording}
                        className="btn flex items-center justify-center rounded-lg shadow-md hover:bg-white hover:bg-opacity-50 hover:border-white hover:border-2 transition w-14 h-14"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          viewBox="0 0 21 25"
                          fill="none"
                        >
                          <path
                            d="M20.0953 10.8765L2.90212 0.283045C2.61225 0.104267 2.28025 0.00666837 1.94041 0.000329735C1.60057 -0.0060089 1.26521 0.0791419 0.968965 0.246988C0.675543 0.412227 0.431113 0.653203 0.260814 0.945133C0.090514 1.23706 0.000490279 1.56941 0 1.908V23.0926C0.00221092 23.6005 0.204573 24.0867 0.562601 24.4444C0.920629 24.8021 1.40502 25.0019 1.90929 25C2.26126 24.9998 2.6064 24.9021 2.90689 24.7175L20.0953 14.1241C20.3716 13.9544 20.5999 13.7161 20.7583 13.432C20.9168 13.1478 21 12.8274 21 12.5015C21 12.1756 20.9168 11.8552 20.7583 11.571C20.5999 11.2869 20.3716 11.0486 20.0953 10.8789V10.8765ZM1.90929 23.0697V1.92363L19.0726 12.5003L1.90929 23.0697Z"
                            fill="#007BFF"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <audio ref={audioRef} />
                </div>

                <div>
                  <label htmlFor="price" className="form-control pt-10">
                    <span className="label-text text-lg text-stark-blue font-light pb-1">
                      Afgiv en pris
                    </span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      id="price"
                      className={`rounded-md text-xs border bg-product-box-blue text-black h-8 pl-3 ${isPrice ? "border-white" : "border-cross-red border-2 animate-bounce"}`}
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <Buttons
                  onRejectClick={onRejectClick}
                  onAcceptClick={onAcceptClick}
                ></Buttons>
              </div>
            </div>
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              rejectProduct={rejectProduct}
            ></Modal>
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <p className="text-stark-blue text-2xl font-light">Indlæser...</p>
          </div>
        )}
      </div>
    </>
  );
};
export default ProductInformation;
