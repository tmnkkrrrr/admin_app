import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientList from "../dashboard/ClientList/ClientList";
import "./Login.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your username");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (email == "admin" && password == "Love@2020") {
      localStorage.setItem("auth", "auth");
      navigate("/dashboard/client_list");
    } else {
      alert("Invalid Credentials");
    }
  };
  return (
    <form className="login">
      <div className="login__container">
        <div className="login__card">
          <h1 className="login__title">WebMaster Login</h1>
          
          <div className="login__field">
            <input
              type="text"
              value={email}
              placeholder="Enter your username here"
              onChange={(ev) => setEmail(ev.target.value)}
              className="login__input"
            />
            {emailError && <p className="login__error">{emailError}</p>}
          </div>
          
          <div className="login__field">
            <input
              type="password"
              value={password}
              placeholder="Enter your password here"
              onChange={(ev) => setPassword(ev.target.value)}
              className="login__input"
            />
            {passwordError && <p className="login__error">{passwordError}</p>}
          </div>
          
          <button 
            type="submit"
            onClick={onButtonClick}
            className="login__button"
          >
            Log in
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;