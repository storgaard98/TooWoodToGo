import React, { Dispatch, SetStateAction } from "react";

interface ModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  removeProduct: () => void;
  id: number;
}

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal }) =>
  showModal && (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal bg-input-box-blue" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold text-stark-orange">Hello!</h3>
          <p className="py-4 text-stark-blue">
            This modal works with a hidden checkbox!
          </p>
          <button
            className="btn bg-accept-blue text-white"
            onClick={() => {
              // Delete the product
              console.log("Product deleted");
              setShowModal(false);
            }}
          >
            Yes
          </button>
          <button
            className="btn bg-cross-red text-white"
            onClick={() => {
              // Do nothing
              console.log("Cancelled");
              setShowModal(false);
            }}
          >
            No
          </button>
        </div>
        <label
          className="modal-backdrop bg-upload-grey"
          htmlFor="my_modal_7"
          onClick={() => setShowModal(false)}
        >
          Close
        </label>
      </div>
    </>
  );

export default Modal;
