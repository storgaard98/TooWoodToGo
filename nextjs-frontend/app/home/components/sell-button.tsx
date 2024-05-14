import React from "react";

type propsType = { isExpanded: boolean };

const SellButton = ({ isExpanded }: propsType) => {
  //TODO Make it red when the square is expanded and look like a cros
  const sellButtonIsExpanded = isExpanded
    ? "opacity-100 translate-y-0 pb-500px"
    : "opacity-0 translate-y-full";

  return (
    <div
      className={`fixed bottom-0 flex flex-col w-full items-center z-20 transition-all duration-700 ease-in-out transform${sellButtonIsExpanded}`}
    >
      <button className="btn btn-outline w-11/12 border-white text-white text-5xl h-24 border-4 rounded-xl">
        Sell
      </button>
    </div>
  );
};

export default SellButton;
