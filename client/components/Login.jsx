const React = require('react');
import { useState } from 'react';

const Login = (props) => {
  return (
    <div id='login'>
      <h1>Wendy and Emily is the best</h1>
      Login
      <input name="username" type="text" placeholder='Username'></input>
      <input name="password" type="password" placeholder="password"></input>
      <input type='submit' value='Login'></input>
      <a id='signup-anchor'>Signup</a>
    </div>
  );
};

export default Login;
