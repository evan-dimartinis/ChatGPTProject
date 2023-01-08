import React, { useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { addQuicklink } from "../store/quicklinksSlice";
import "../styles/quicklinks.css";
import QuicklinkEditRow from "./quicklinkeditrow";

const EditLinkModal = (props) => {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.Quicklinks.quicklinks);
  const token = useSelector((state) => state.Auth.session_token);

  const [newLabel, setNewLabel] = useState("");
  const [newURL, setNewURL] = useState("");

  const addQL = () => {
    dispatch(addQuicklink({ token: token, label: newLabel, url: newURL }));
    setNewLabel("");
    setNewURL("");
  };

  return (
    <ReactModal
      ariaHideApp={false}
      closeTimeoutMS={250}
      className={"modalcontent"}
      bodyOpenClassName="ReactModal-open"
      isOpen={props.isOpen}
    >
      <div className="edit-link-modal-container">
        <h1 onClick={() => props.closeModal()}>Edit Quick Links</h1>
        {links !== undefined && links.length > 0
          ? links.map((data) => {
              return <QuicklinkEditRow  key={data.hmy} data={data} />;
            })
          : null}
        <div className="add-quicklink-row">
          <input
            type={"text"}
            className="new-label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <input
            type={"text"}
            className="new-url"
            value={newURL}
            onChange={(e) => {
              setNewURL(e.target.value);
            }}
          />
          <button onClick={addQL} className="add-quicklink-btn">
            Add
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default EditLinkModal;
