import React from "react";
import ReactModal from "react-modal";
import "../styles/addrequestmodal.css"

const AddRequestModal = (props) => {
  return (
    <ReactModal
      ariaHideApp={false}
      closeTimeoutMS={250}
      className={"modalcontent"}
      bodyOpenClassName="ReactModal-open"
      isOpen={props.isOpen}
    >
      <div className="add-request-container">
        <button onClick={() => props.closeModal()} >close modal</button>
        <input type={"text"} placeholder="Title..." />
        <textarea className="request-textarea" />
      </div>
    </ReactModal>
  );
};

export default AddRequestModal;
