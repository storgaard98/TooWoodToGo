import React from "react";
import ProductInformation from "../Components/product-information";
import Logo from "../Components/logo";
type propsType = { params: { productID: string } };

//Get the ID displayed {productID}
const productDetails = ({ params: { productID } }: propsType) => {
  return (
    <div className="flex flex-col bg-input-box-blue w-screen h-screen">
      <div className="absolute top-3 left-3">
        <Logo />
      </div>
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex justify-center items-center bg-product-box-blue w-3/5 h-2/3 rounded-xl"></div>
        <ProductInformation></ProductInformation>
      </div>
    </div>
  );
};

export default productDetails;
