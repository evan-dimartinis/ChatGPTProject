import React, { useState } from "react";
import EditLinkModal from "../components/editlinkmodal";
import '../styles/dashboard.css';

const Dashboard = (props) => {
    const [isEditLinks, setIsEditLinks] = useState(false)

    return (
        <div className="dashboard-page-container">
            <div className="date-container">
                <h1>{'<'}</h1>
                <h1>January 3, 2023</h1>
                <h1>{'>'}</h1>
            </div>
            <div className="link-bar">
                <div className="link-bar-scroll">
                    <div className="link-element">
                        <a href="https://worldle.teuteuf.fr/" target="_blank">Worldle</a>
                    </div>
                    <div className="link-element">
                        <a href="https://worldle.teuteuf.fr/" target="_blank">Worldle</a>
                    </div>
                    <div className="link-element">
                        <a href="https://worldle.teuteuf.fr/" target="_blank">Worldle</a>
                    </div>
                    <div className="link-element">
                        <a href="https://worldle.teuteuf.fr/" target="_blank">Worldle</a>
                    </div>
                    <div className="link-element">
                        <a href="https://worldle.teuteuf.fr/" target="_blank">Worldle</a>
                    </div>
                </div>
                <button className="edit-link-btn" onClick={() => setIsEditLinks(true)}>Edit</button>
            </div>
            <EditLinkModal isOpen={isEditLinks} closeModal={() => setIsEditLinks(false)} />
        </div>
    )
}

export default Dashboard;