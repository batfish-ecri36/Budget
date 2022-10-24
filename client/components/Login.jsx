const React = require("react");
import { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import style from "../styles/login.scss";

// const navigate = useNavigate();

const sendUser = async (user, pass, dispatch) => {
  const userData = { username: user, password: pass };
  const response = await axios.post('/users/login', userData);
  // all the data associated with that username
  const data = response.data;
  // create route to main page
  dispatch(data);
  return;
};

const Login = (props) => {
  return (
    <div id="login">
      <div id="inner-login">
        <h1>Site Name</h1>
        {/* <h1>Wendy and Emily are the best</h1> */}
        <p>Login</p>
        <div id="login-form">
          <input id="username" type="text" placeholder="Username"></input>
          <input id="password" type="password" placeholder="Password"></input>
        </div>
        <div id="signup-div">
          <a href="/signup" id="signup-anchor">
            Signup
          </a>
          <button
            id="login-submit"
            onClick={() => {
              const user = document.getElementById("username");
              const pass = document.getElementById("password");
              if (!user.value || !pass.value) {
                if (!user.value) {
                  user.style.borderColor = "red";
                }
                if (!pass.value) {
                  pass.style.borderColor = "red";
                }
              } else {
                const data = sendUser(user.value, pass.value, props.login);
              }
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
