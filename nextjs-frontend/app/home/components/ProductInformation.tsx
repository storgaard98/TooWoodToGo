import React, { useState } from "react";

interface MaterialInformationData {
  quantity: number;
}

type propsType = { isExpanded: boolean };

const ProductInformation = ({ isExpanded }: propsType) => {
  let quantity = 0;

  const materialInformationData: MaterialInformationData = {
    quantity,
  };

  const formIsExpanded = isExpanded
    ? "opacity-100 pt-52"
    : "opacity-0 pt-2080px";

  //TODO: Remove the ugly arrows in the quantity input field
  //TODO: Make it possible to input other numbers that 0 in the quantity input field
  return (
    <form>
      <div
        className={`flex flex-col w-full items-center absolute z-10 transition-all ease-in-out duration-700 ${formIsExpanded}`}
      >
        <div className=" h-600px bg-input-box-blue rounded-70px w-11/12">
          <p className="text-upload-grey text-4xl p-11">
            Upload up to 6 photos
          </p>
        </div>
        <label className="form-control  pt-6 w-11/12">
          <div className="label">
            <span className="label-text text-white text-4xl">Product Name</span>
          </div>
          <input
            type="text"
            className="input rounded-3xl text-5xl h-32 bg-input-box-blue text-white pl-10"
          />
        </label>
        <label className="form-control  pt-6 w-11/12">
          <div className="label">
            <span className="label-text text-white text-4xl">
              Make a description
            </span>
          </div>
          <input
            type="text"
            className="input rounded-3xl text-5xl h-52 bg-input-box-blue text-white pl-10"
          />
        </label>
        <label className="form-control  pt-6 w-11/12">
          <div className="label">
            <span className="label-text text-white text-4xl">Quantity</span>
          </div>
          <input
            type="number"
            className="input rounded-3xl text-5xl h-32 bg-input-box-blue text-white pl-10"
            value={quantity}
          />
        </label>
      </div>
    </form>
  );
};

export default ProductInformation;
