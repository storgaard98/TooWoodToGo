"use cleint";
import React from "react";

const Buttons = ({
  onRejectClick,
  onAcceptClick,
}: {
  onRejectClick: () => void;
  onAcceptClick: () => void;
}) => {
  return (
    <div className="flex flex-row p-2 gap-2">
      <button
        className="border hover:bg-accept-blue hover:text-white border-accept-blue hover:border-transparent bg-input-box-blue rounded-full w-32 active:scale-90 transform transition"
        type="button"
        onClick={onRejectClick}
      >
        <p className="text-white font-light">Afvis</p>
      </button>
      <button
        className="border border-input-box-blue hover:bg-input-box-blue hover:text-white hover:border-transparent bg-accept-blue rounded-full w-2/3 active:scale-90 transform transition"
        type="button"
        onClick={onAcceptClick}
      >
        <p className="text-white font-light">Acceptere og send</p>
      </button>
    </div>
  );
};

export default Buttons;
