import React from 'react';
import '../styles/requestelement.css'

const RequestElement = (props) => {

    return (
        <div className="element-container">
            <p>{props.request.label}</p>
        </div>
    )
}

export default RequestElement;