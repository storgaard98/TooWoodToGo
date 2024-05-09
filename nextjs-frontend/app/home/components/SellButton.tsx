import { todo } from "node:test";
import React from "react";

const SellButton = ({ onButtonClick }: { onButtonClick: () => void }) => {
  return (
    //TODO Change the black stroke to white
    //TODO Remove the hover effect
    <div className="fixed bottom-0 pb-48">
      <button
        className="btn btn-circle btn-outline rotate-45 h-48 w-48"
        onClick={onButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 stroke-white"
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
    </div>
  );
};

export default SellButton;
