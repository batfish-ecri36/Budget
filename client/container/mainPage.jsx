const React = require('react');
import { useState } from 'react';

const MainPage = (props) => {
  return (
    <div>
      <h1>Wendy and Emily is the best</h1>
      <div>
        <div id='trans-display'></div>
        <input id='new-trans'></input> <a id='add-butt'>Add Transaction</a>
      </div>
      <div id='graph'></div>
      <div id='summary'></div>
    </div>
  );
};
