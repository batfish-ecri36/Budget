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
      <input
        id='username'
        name='username'
        type='text'
        placeholder='Username'
      ></input>
      <input
        id='password'
        name='password'
        type='password'
        placeholder='Password'
      ></input>
      <input
        id='confirm-pass'
        name='confirm password'
        type='password'
        placeholder='Confirm Password'
      ></input>
      <button
        id='signup-button'
        onClick={() => {
          const user = document.getElementById('username');
          const pass = document.getElementById('password');
          const confirm = document.getElementById('confirm-pass');
          if (!user.value || !pass.value || !confirm.value) {
            if (!user.value) {
              user.style.borderColor = 'red';
            }
            if (!pass.value) {
              pass.style.borderColor = 'red';
            }
            if (!confirm.value) {
              confirm.style.borderColor = 'red';
            }
          } else {
            if (pass !== confirm.value) {
              confirm.style.borderColor = 'red';
            } else {
              createUser(user.value, pass.value);
            }
          }
        }}
      >
        Signup
      </button>
    </div>
  );
};

export default Signup;
