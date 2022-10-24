const React = require("react");
import { useState } from "react";
import style from "../styles/signup.scss";

const createUser = async (user, pass) => {
  const response = await axios.post("/signup", {
    username: user,
    password: pass,
  });
  const data = await response.json();
};

const Signup = (props) => {
  return (
    <div id="signup">
      <div id="inner-signup">
        <h1>Site Name</h1>
        <p>Signup</p>
        <div id="signup-form">
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
          ></input>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          ></input>
          <input
            id="confirm-pass"
            name="confirm password"
            type="password"
            placeholder="Confirm Password"
          ></input>
          <div id='signup-submit'>
            <a id='login-anchor' href='/'>Back to Login</a>
            <button
              id="signup-button"
              onClick={() => {
                const user = document.getElementById("username");
                const pass = document.getElementById("password");
                const confirm = document.getElementById("confirm-pass");
                if (!user.value || !pass.value || !confirm.value) {
                  if (!user.value) {
                    user.style.borderColor = "red";
                  }
                  if (!pass.value) {
                    pass.style.borderColor = "red";
                  }
                  if (!confirm.value) {
                    confirm.style.borderColor = "red";
                  }
                } else {
                  if (pass !== confirm.value) {
                    confirm.style.borderColor = "red";
                  } else {
                    createUser(user.value, pass.value);
                  }
                }
              }}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
