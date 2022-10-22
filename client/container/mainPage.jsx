const React = require('react');
import { useState } from 'react';
import Transactions from '../components/Transactions.jsx';

// {
//     date:
//     item:
//     amount:
//     category:
// }

const MainPage = (props) => {
  const transArray = [];
  return (
    <div>
      <h1>Peter and Andy are also great!</h1>
      <div>
        <div id='trans-display'></div>
        {transArray}
        <input id='new-trans'></input> <a id='add-butt'>Add Transaction</a>
      </div>
      <div id='graph'></div>
      <div id='summary'></div>
    </div>
  );
};

export default MainPage;
