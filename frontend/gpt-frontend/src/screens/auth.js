import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { autologin, login } from "../store/authSlice";
import "../styles/auth.css";

export default function Auth(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(["session_token"]);

  const loginerror = useSelector((state) => state.Auth.loginerror);
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
  const session_token = useSelector((state) => state.Auth.session_token);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      setCookie("session_token", session_token, {
        path: "/",
      });
      navigate("/dashboard");
    }
    if (cookie.session_token !== undefined) {
      if (
        cookie.session_token !== "" &&
        cookie.session_token !== undefined
      ) {
        dispatch(autologin(cookie.session_token));
      }
    }
  }, [dispatch, isAuthenticated]);

  const LogInUser = async () => {
    await dispatch(
      login({
        username: username,
        password: password,
      })
    );
  };

  return (
    <div className="AuthContainer">
      <div className="AuthHeaderDiv">
        <h1 className="AuthHeader">Sign in to your Dashboard!</h1>
      </div>

      <div className="AuthFormDiv">
        <div className="AuthFormField">
          <input
            type={"text"}
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="AuthFormInput"
          />
          <label className="AuthFormLabel username">Username</label>
        </div>
        <div className="AuthFormField">
          <input
            type={"password"}
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="AuthFormInput"
          />
          <label className="AuthFormLabel">Password</label>
        </div>
        <div className="errordiv">
          {loginerror !== "" ? (
            <p className="errormessage">{loginerror}</p>
          ) : null}
        </div>
        <button type="button" onClick={LogInUser} className="LogInButton">
          Log In
        </button>
        <button
          onClick={() => {
            console.log(isAuthenticated);
            console.log(cookie.session_token.data);
          }}
        >
          log stuff
        </button>
      </div>
    </div>
  );
}
