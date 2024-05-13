import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

interface ProductsProps {
  productName: string;
  price: number;
  pathToImage: string;
}

const products = (props: ProductsProps) => {
  return (
    <div className=" relative px-10 py-10">
      <div className="card card-side shadow-xl rounded-xl bg-product-blue py-20">
        <button className="absolute top-0 right-0 m-4 btn btn-circle h-15 w-15 border-4 bg-red-600 flex items-center justify-center border-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <figure>
          <Image src="/Rectangle.png" alt="Movie" width={600} height={600} />
        </figure>
        <div className="card-body text-stark-blue">
          <h2 className="card-title ">{props.productName}</h2>
          <p>Click the button to watch on Jetflix app.</p>
          <div className="card-actions justify-end">
            <button className="badge badge-outline px-8 py-6  hover:bg-cyan-400 hover:text-white text-cyan-400 border-cyan-400 hover:border-transparent bg-stark-blue text-xl">
              Reject
            </button>
            <button className="badge badge-outline px-8 py-6 border  hover:bg-stark-blue hover:text-white  border-stark-blue hover:border-transparent bg-cyan-400 text-xl">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

products.propTypes = {
  productName: PropTypes.string.isRequired,
  price: PropTypes.number,
  pathToImage: PropTypes.string.isRequired,
};

export default products;
