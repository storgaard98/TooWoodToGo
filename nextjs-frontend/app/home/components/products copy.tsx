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
    <div className="flex flex-col md:flex-row m-2 bg-product-blue shadow-l rounded-l card card-side">
      <button className="absolute right-0 m-1 btn btn-circle border-1 bg-red-600 flex items-center justify-center border-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 stroke-white"
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
      <figure className="flex-shrink-0">
        <Image src={"/Rectangle.png"} alt="Product" width={110} height={100} />
      </figure>
      <div className="flex-grow card-body text-stark-blue">
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
