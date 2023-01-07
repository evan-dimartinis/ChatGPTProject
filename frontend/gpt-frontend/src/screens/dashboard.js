import React, { useEffect, useState } from "react";
import EditLinkModal from "../components/editlinkmodal";
import { useCookies } from "react-cookie";
import '../styles/dashboard.css';

const Dashboard = (props) => {
    const [isEditLinks, setIsEditLinks] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(['session_token'])

    /* 
    SHOULD PROBABLY DO LIKE A USEEFFECT VERIFY SESSION TOKEN THING
    ACTUALLY THAT SHOULD HAPPEN AUTOMATICALLY ON THE SERVER
    IF SESSION TOKEN DOESN'T EXIST THEN REDIRECT BACK TO AUTH
    */

    useEffect(() => {
        const verifyToken = () => {
            console.log(cookie.session_token)
        }
        verifyToken()
    }, [])

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
                        <a href="https://worldle.teuteuf.fr/" rel="noreferrer" target="_blank">Worldle</a>
                    </div>
                    <div className="link-element">
                        <a href="https://worldle.teuteuf.fr/" rel="noreferrer" target="_blank">Worldle</a>
                    </div>
                    <div className="link-element">
                        <a href="https://worldle.teuteuf.fr/" rel="noreferrer" target="_blank">Worldle</a>
                    </div>
                    <div className="link-element">
                        <a href="https://worldle.teuteuf.fr/" rel="noreferrer" target="_blank">Worldle</a>
                    </div>
                    <div className="link-element">
                        <a href="https://worldle.teuteuf.fr/" rel="noreferrer" target="_blank">Worldle</a>
                    </div>
                </div>
                <button className="edit-link-btn" onClick={() => setIsEditLinks(true)}>Edit</button>
            </div>
            <EditLinkModal isOpen={isEditLinks} closeModal={() => setIsEditLinks(false)} />
            
        </div>
    )
}

export default Dashboard;