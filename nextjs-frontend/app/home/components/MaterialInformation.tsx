import React from "react";

const MaterialInformation = () => {
  return (
    <div className="flex flex-col w-full items-center pt-52 absolute z-10">
      <div className=" h-600px bg-input-box-blue rounded-70px w-11/12">
        <p className="text-upload-grey text-4xl p-11">Upload up to 6 photos</p>
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
          type="text"
          className="input rounded-3xl text-5xl h-32 bg-input-box-blue text-white pl-10"
        />
      </label>
    </div>
  );
};

export default MaterialInformation;
