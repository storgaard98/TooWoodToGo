import React from "react";

type propsType = { isExpanded: boolean };

const SellButton = ({ isExpanded }: propsType) => {
  //TODO Make it red when the square is expanded and look like a cros
  const sellButtonIsExpanded = isExpanded
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-96";

  return (
    <div
      className={`absolute bottom-10 flex flex-col w-full justify-end items-center z-20 transition-all duration-700 ease-in-out transform ${sellButtonIsExpanded}`}
    >
      <button className="btn btn-outline w-2/3 border-white border-1 rounded-lg">
        <p className="text-white text-xl">Sælg</p>
      </button>
    </div>
  );
};

export default SellButton;
