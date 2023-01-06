import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { login } from "../store/authSlice";
import '../styles/auth.css'

export default function Auth(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {});

  const LogInUser = async () => {
    dispatch(login({
      username: "evan",
      password: "password"
    }))
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
          <label className="AuthFormLabel">Username</label>
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
        <button type="button" onClick={LogInUser} className="LogInButton">
          Log In
        </button>
      </div>
    </div>
  );
}
