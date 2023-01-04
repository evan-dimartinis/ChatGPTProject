import React from "react";
import ReactModal from "react-modal";
import '../styles/editlinkmodal.css'

const EditLinkModal = (props) => {
  return (
    <ReactModal closeTimeoutMS={250} className={"modalcontent"} bodyOpenClassName='ReactModal-open' isOpen={props.isOpen}>
      <div className="edit-link-modal-container">
        <h1 onClick={() => props.closeModal()}>Edit Quick Links</h1>
      </div>
    </ReactModal>
  );
};

export default EditLinkModal;
