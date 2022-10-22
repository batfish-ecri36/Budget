const React = require('react');
import { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// const navigate = useNavigate();

const sendUser = async (user, pass, dispatch) => {
  try{
    const response = await axios.get('/users/login', {
      params: { username: user, password: pass },
    });
    //create route to main page
    const data = response.data;
    dispatch(response.data.username);
    console.log(data)
    return;
  }
  catch(err){
    console.log(err);
  }  
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
          const user = document.getElementById('username');
          const pass = document.getElementById('password');
          if (!user.value || !pass.value) {
            if (!user.value) {
              user.style.borderColor = 'red';
            }
            if (!pass.value) {
              pass.style.borderColor = 'red';
            }
          } else {
            const data = sendUser(user.value, pass.value, props.login);
          }
        }}
      >
        Login
      </button>
      <a id='signup-anchor'>Signup</a>
    </div>
  );
};

export default Login;
