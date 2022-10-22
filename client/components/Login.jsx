const React = require('react');
import { useState } from 'react';
import { connect } from 'react-redux';

const sendUser = async (user, pass, dispatch) => {
  const response = await axios.get('/login', {
    username: user,
    password: pass,
  });
  //create route to main page
  const data = await response.json();
  dispatch(data);
};

const Login = (props) => {
  return (
    <div id='login'>
      <h1>Wendy and Emily are the best</h1>
      Login
      <input id='username' type='text' placeholder='Username'></input>
      <input id='password' type='password' placeholder='password'></input>
      <button
        id='login-submit'
        onClick={() => {
          const user = document.getElementById('username').value;
          const pass = document.getElementById('password').value;
          sendUser(user, pass, props.login);
        }}
      >
        Login
      </button>
      <a id='signup-anchor'>Signup</a>
    </div>
  );
};

export default Login;
