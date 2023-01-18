import React, {useState} from "react";
import { useDispatch } from "react-redux";
import "../styles/body.css";
import RequestBar from "./requestbar";

const Body = (props) => {
    const dispatch = useDispatch()
    const [showRequestBar, setShowRequestBar] = useState(true);

    return (
        <div className="body-container">
            <RequestBar show={showRequestBar} />
            <button onClick={() => setShowRequestBar(!showRequestBar)} className="request-bar-toggle-btn">Open drawer</button>
        </div>
    )
}

export default Body;