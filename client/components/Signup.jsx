const React = require('react');
import { useState } from 'react';

const Signup = (props) => {
  return (
    <div id='signup'>
      <h1>Wendy and Emily is the best</h1>
      Signup
      <input name="username" type="text" placeholder='Username'></input>
      <input name="password" type="password" placeholder="password"></input>
      <input type='submit' value='Signup'></input>
    </div>
  );
};

export default Signup;