import React, { useEffect, useState } from "react";
import EditLinkModal from "../components/editlinkmodal";
import { useCookies } from "react-cookie";
import "../styles/dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuicklinks } from "../store/quicklinksSlice";
import { getRequests } from "../store/requestsSlice";
import RequestBar from "../components/requestbar";
import Body from "../components/body";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditLinks, setIsEditLinks] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["session_token"]);
  const isAuth = useSelector((state) => state.Auth.isAuthenticated);
  const token = useSelector((state) => state.Auth.session_token);
  const links = useSelector((state) => state.Quicklinks.quicklinks);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    } else {
      dispatch(getQuicklinks(token));
      dispatch(getRequests(token))
    }
  }, []);

  return (
    <div className="dashboard-page-container">
      <div className="date-container">
        <h1>{"<"}</h1>
        <h1>January 3, 2023</h1>
        <h1>{">"}</h1>
      </div>
      <div className="link-bar">
        <div className="link-bar-scroll">
          {links !== undefined && links.length > 0
            ? links.map((item) => {
                return (
                  <div key={item.hmy} className="link-element">
                    <a
                      href={item.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {item.label}
                    </a>
                  </div>
                );
              })
            : null}
        </div>
        <button className="edit-link-btn" onClick={() => setIsEditLinks(true)}>
          Edit
        </button>
      </div>
      <EditLinkModal
        isOpen={isEditLinks}
        closeModal={() => setIsEditLinks(false)}
      />
      <div className="dashboard-body-container">
        <RequestBar />
        <Body />
      </div>
      
    </div>
  );
};

export default Dashboard;
