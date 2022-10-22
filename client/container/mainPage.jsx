const React = require('react');
import { useState } from 'react';
import Transactions from '../components/Transactions.jsx';

transactions: [
  {
    date: '',
    item: '',
    amount: '',
    category: '',
  },
];

const MainPage = (props) => {
  const transArray = [];
  const [display, setDisplay] = useState('week');
  if (display === 'week') {
    return (
      <div>
        <h1>Peter and Andy are also great!</h1>
        <div>
          <div id='trans-display'></div>
          {transArray}
          <input id='new-trans'></input> <a id='add-butt'>Add Transaction</a>
        </div>
        <div id='graph'></div>
        <label htmlfor='summary' id='summary'>
          Summary
          <submit>
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
            <option value='average'>Average</option>
          </submit>
        </label>
      </div>
    );
  }
};
export default MainPage;
