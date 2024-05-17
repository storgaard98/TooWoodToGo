"use client";
import React from "react";
import { NextApiRequest, NextApiResponse } from "next";
import Buttons from "./buttons";
import Images from "./images";

type propsType = { productID: string };

const ProductInformation = ({ productID }: propsType) => {
  const product = {
    productName: "RØD MURSTEN",
    date: "16. maj 2024",
    company: "Bobs byggefirma",
    email: "byggemand@bob.com",
    phone: "12345678",
    quantity: "2,5 pallets",
    description: "2 paller røde mursten, ikke brugt",
  };

  const onRejectClick = () => {
    console.log("reject");
  };

  const onAcceptClick = () => {
    console.log("accept");
  };
  return (
    <div className="flex w-full h-full p-2">
      <div className="flex flex-row w-1/2 h-full rounded-xl pr-2 ">
        <Images></Images>
      </div>
      <div className="flex flex-col w-1/2 h-full justify-between rounded-xl pl-2 ">
        <div className="flex flex-col">
          <div className="text-stark-blue text-3xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-medium">
            {product.productName}
          </div>
          <div>
            <p className="text-stark-blue text-sm font-light">
              Uploaded {product.date} by {product.company}
            </p>
          </div>
          <div>
            <p className="text-stark-blue text-sm font-light">
              Email: {product.email} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phone:
              {product.phone}
            </p>
          </div>
          <div className="text-stark-blue text-4xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl pt-5% font-light">
            {product.quantity}
          </div>
          <div className="pt-20%">
            <p className="text-stark-blue text-sm font-light">Description:</p>
            <p className="text-sm font-light text-black">{product.description}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Buttons
            onRejectClick={onRejectClick}
            onAcceptClick={onAcceptClick}
          ></Buttons>
        </div>
      </div>
    </div>
  );
};
export default ProductInformation;
