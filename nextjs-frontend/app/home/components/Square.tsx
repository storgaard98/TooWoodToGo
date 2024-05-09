import React from "react";

type propsType = { isExpanded: boolean };

const Square = ({ isExpanded }: propsType) => {
  const sizeOfSquareClass = isExpanded ? "h-16/17" : "h-1/5";
  //TODO make rounded corners
  return (
    <div
      className={`rounded-t-70px absolute bottom-0 w-full bg-stark-blue transition-all duration-700 ease-in-out ${sizeOfSquareClass}`}
    ></div>
  );
};

export default Square;
