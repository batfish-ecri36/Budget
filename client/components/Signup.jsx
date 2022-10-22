const React = require('react');
import { useState } from 'react';

const createUser = async (user, pass) => {
  const response = await axios.post('/signup', {
    username: user,
    password: pass,
  });
  const data = await response.json();
};

const Signup = (props) => {
  return (
    <div id='signup'>
      <h1>Wendy and Emily are the best</h1>
      Signup
      <input name='username' type='text' placeholder='Username'></input>
      <input name='password' type='password' placeholder='password'></input>
      <button
        id='signup-button'
        onClick={() => {
          const user = document.getElementById('username').value;
          const pass = document.getElementById('password').value;
          createUser(user, pass);
        }}
      >
        Signup
      </button>
    </div>
  );
};

export default Signup;
