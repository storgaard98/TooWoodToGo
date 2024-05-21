import React, { Dispatch, SetStateAction } from "react";

interface ModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  rejectProduct: () => void;
}

const Modal = (props: ModalProps) =>
  props.showModal && (
    <div className="z50">
      <input
        type="checkbox"
        id="my_modal_7"
        className="modal-toggle"
        checked={props.showModal}
        readOnly
      />
      <div
        className="modal bg-stark-blue text-black ease-in-out transition-all duration-500"
        role="dialog"
      >
        <div className="modal-box p-4">
          <h3 className="text-lg font-bold"></h3>
          <p className="py-4">
            Er du sikker på, at du vil afvise dette produkt?
          </p>
          <button
            onClick={props.rejectProduct}
            className="bg-stark-orange text-white py-2 px-4 rounded"
          >
            Afvis produkt
          </button>
          <button
            onClick={() => props.setShowModal(false)}
            className="bg-input-box-blue text-white py-2 px-4 rounded ml-2"
          >
            Luk
          </button>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="my_modal_7"
          onClick={() => props.setShowModal(false)}
        >
          Luk
        </label>
      </div>
    </div>
  );

export default Modal;
