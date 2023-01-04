import React from "react";
import '../styles/dashboard.css'

const Dashboard = (props) => {
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
                <button className="edit-link-btn">Edit</button>
            </div>
        </div>
    )
}

export default Dashboard;