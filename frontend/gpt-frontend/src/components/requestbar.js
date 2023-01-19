import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/requestbar.css";
import RequestElement from "./requestelement";

const RequestBar = (props) => {
  const requests = useSelector((state) => state.Requests.requests);

  return (
    <div
      className={
        props.show ? "request-bar-div active" : "request-bar-div inactive"
      }
    >
      {requests.map((request) => {
        return <RequestElement request={request} key={request.hmy} />;
      })}
      <div className="add-request-div">
        <button
          className={`add-request-btn ${
            props.show ? "active" : "inactive-btn"
          }`}
        >
          New Request
        </button>
      </div>
    </div>
  );
};

export default RequestBar;
