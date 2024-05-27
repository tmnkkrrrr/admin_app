import React, { useState } from "react";
import "./Login.css";
import Dashboard from "./dashbaord";

const Login = (props) => {
  const [logedIn, LogedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
      setEmailError("Please enter your username");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (email == "admin" && password == "Love@2020") {
      LogedIn(true);
    } else {
      alert("Invalid Credentials");
    }
  };
  return (
    <React.Fragment>

      {logedIn ? (
        <div>
        <Dashboard />
          <button onClick={(e) =>{
            setEmail('');
            setPassword('');
            LogedIn(false)}}>Logout</button>
        </div>
      ) : (
        <React.Fragment>
    <div className={"mainContainer"}>

          <div className={"titleContainer"}>
            <div>WebMaster Login</div>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              value={email}
              placeholder="Enter your username here"
              onChange={(ev) => setEmail(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              value={password}
              placeholder="Enter your password here"
              onChange={(ev) => setPassword(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              className={"inputButton"}
              type="button"
              onClick={onButtonClick}
              value={"Log in"}
            />
          </div>
    </div>

        </React.Fragment>
      )}
    </React.Fragment>

  );
};

export default Login;
