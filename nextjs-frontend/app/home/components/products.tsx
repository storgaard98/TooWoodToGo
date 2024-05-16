import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Modal from "./modal";

interface ProductsProps {
  productName: string;
  price: string;
  pathToImage: string;
  removeProduct: (id: string) => void;
  id: string;
}

const Products = (props: ProductsProps) => {
  const [showModal, setShowModal] = useState(false);

  function updatePriceStatus(status: string) {
    if (status === "Reject") setShowModal(true);
    console.log(`Price ${status}ed`);
    fetch("/api/update-price-status-handler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status, id: props.id}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="flex flex-col flex-wrap">
      <div className="relative flex flex-row m-2 bg-product-blue rounded-2xl h-32 shadow-product-box">
        <figure className="rounded-xl flex items-center pl-2">
          <Image
            src={props.pathToImage}
            alt="Product"
            width={100}
            height={100}
            className="h-5/6 rounded-xl object-cover"
            quality={50}
          />
        </figure>

        <div className="flex-grow text-input-box-blue pl-2">
          <h1 className="text-lg ">{props.productName}</h1>
          <p className="text-sm">This is a small description.</p>
          <div className="absolute bottom-1 right-1 flex flex-row gap-3">
            <button
              className="badge badge-outline hover:bg-accept-blue hover:text-white text-accept-blue border-accept-blue hover:border-transparent bg-input-box-blue w-24"
              onClick={() => updatePriceStatus("Reject")}
              type="button"
            >
              <p className="p-2 ">Reject</p>
            </button>
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              removeProduct={() => props.removeProduct(props.id)}
            />
            <button
              className="badge badge-outline hover:bg-input-box-blue hover:text-white  border-input-box-blue hover:border-transparent bg-accept-blue w-24"
              onClick={() => updatePriceStatus("Accept")}
              type="button"
            >
              <p className="p-1">Accept</p>
            </button>
          </div>
          <div>
            <button
              className="absolute top-0 right-0 m-1 w-6 h-6 flex items-center justify-center rounded-full bg-cross-red"
              onClick={() => props.removeProduct(props.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M3.53555 3.53554C6.36398 6.36397 9.42811 9.42809 10.6066 10.6066"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6066 3.53554C7.77817 6.36396 4.71404 9.42809 3.53553 10.6066"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Products.propTypes = {
  productName: PropTypes.string.isRequired,
  price: PropTypes.number,
  pathToImage: PropTypes.string.isRequired,
};

export default Products;
