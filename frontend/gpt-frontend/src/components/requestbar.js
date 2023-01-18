import React, { useState } from 'react';
import "../styles/requestbar.css"

const RequestBar = (props) => {
    return (
        <div className={props.show ? "request-bar-div active" : "request-bar-div inactive"}>

        </div>
    )
}

export default RequestBar;