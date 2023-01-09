import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuicklink, updateQuicklink } from "../store/quicklinksSlice";
import '../styles/quicklinks.css'

const QuicklinkEditRow = (props) => {
    const dispatch = useDispatch()
    const [label, setLabel] = useState(props.data.label)
    const [url, setUrl] = useState(props.data.url)
    const [hmy, setHmy] = useState(props.data.hmy)
    const token = useSelector((state) => state.Auth.session_token)

    const updateLink = () => {
        dispatch(updateQuicklink({
            token: token,
            hmy: hmy,
            label: label,
            url: url
        }))
    }

    const deleteLink = () => {
        dispatch(deleteQuicklink({
            token: token,
            hmy: hmy
        }))
    }

    return (
        <div className="row-container">
            <input type={"text"} className="label-input" value={label} onChange={(e) => setLabel(e.target.value)} />
            <input type={"text"} className="url-input" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button className="quicklink-edit-btn" onClick={updateLink}>Save</button>
            <button className="quicklink-delete-btn" onClick={deleteLink}>Delete</button>
        </div>
    )
}

export default QuicklinkEditRow;