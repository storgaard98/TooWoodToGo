import React, { Dispatch, SetStateAction } from "react";

interface ModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  removeProduct: () => void;
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
      <div className="modal bg-stark-blue text-white" role="dialog">
        <div className="modal-box p-4">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Do you want to delete the product!</p>
          <button onClick={props.removeProduct} className="bg-stark-orange text-white py-2 px-4 rounded">
            Delete Product
          </button>
          <button onClick={() => props.setShowModal(false)} className="bg-input-box-blue text-white py-2 px-4 rounded ml-2">
            Close
          </button>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="my_modal_7"
          onClick={() => props.setShowModal(false)}
        >
          Close
        </label>
      </div>
    </div>
  );

export default Modal;