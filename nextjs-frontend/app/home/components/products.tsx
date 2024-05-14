import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

interface ProductsProps {
  productName: string;
  price: number;
  pathToImage: string;
}

const Products = (props: ProductsProps) => {
  return (
    <div className="relative flex flex-row m-2 bg-product-blue shadow-l rounded-xl">
      <button className="absolute top-0 right-0 m-1 btn btn-circle border-1 bg-red-600 flex items-center justify-center border-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-2 w-2 stroke-white"
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
      <figure className="flex-shrink-0 rounded-xl">
        <Image src={props.pathToImage} alt="Product" width={100} height={50} objectFit="cover"/>
      </figure>
      <div className="flex-grow text-stark-blue">
        <h2 className="text-semi-bold text-lg">{props.productName}</h2>
        <p className="text-xs">Click the button to watch on Jetflix app.</p>
        <div className="card-actions justify-end md:flex">
          <button className="badge badge-outline hover:bg-cyan-400 hover:text-white text-cyan-400 border-cyan-400 hover:border-transparent bg-stark-blue">
            Reject
          </button>
          <button className="badge badge-outline border hover:bg-stark-blue hover:text-white  border-stark-blue hover:border-transparent bg-cyan-400">
            Accept
          </button>
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