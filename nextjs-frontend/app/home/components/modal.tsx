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
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <button onClick={props.removeProduct}>
            Delete Product
          </button>
          <button onClick={() => props.setShowModal(false)}>Close</button>
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
