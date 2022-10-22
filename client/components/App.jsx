const React = require('react');
import { render } from 'react-dom';
import { useState } from 'react';
import Login from './Login.jsx';

const App = (props) => {
  if (user) {
    //   if user has active session, render this
    return <div id='main'>HELLO REACT WORKS</div>;
  } else {
    //   else this
    return <Login />;
  }
};

export default App;
