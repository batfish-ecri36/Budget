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
  props.transactions.forEach((transaction) => {
    <Transactions
      date={transaction.date}
      item={transaction.item}
      amount={transaction.amount}
      category={transactions.category}
    />;
  });
  const [display, setDisplay] = useState('week');
  if (display === 'week') {
    return (
      <div>
        <h1>Peter and Andy are also great!</h1>
        <div>
          Week
          <label htmlFor='list-type'>
            <select
              id='list-type'
              onChange={(event) => {
                setDisplay(event.target.value);
              }}
            >
              <option value='week'>Week</option>
              <option value='month'>Month</option>
              <option value='year'>Year</option>
            </select>
          </label>
          <div id='trans-display'></div>
          {transArray}
          <input id='new-trans'></input> <a id='add-butt'>Add Transaction</a>
        </div>
        <div id='graph'></div>
      </div>
    );
  } else if (display === 'month') {
    if (display === 'month') {
      return (
        <div>
          <h1>Peter and Andy are also great!</h1>
          <div>
            Month
            <label htmlFor='list-type'>
              <select
                id='list-type'
                onChange={(event) => {
                  setDisplay(event.target.value);
                }}
              >
                <option value='week'>Week</option>
                <option value='month'>Month</option>
                <option value='year'>Year</option>
              </select>
            </label>
            <div id='trans-display'></div>
            {transArray}
            <input id='new-trans'></input> <a id='add-butt'>Add Transaction</a>
          </div>
          <div id='graph'></div>
        </div>
      );
    }
  } else if (display === 'year') {
    return (
      <div>
        <h1>Peter and Andy are also great!</h1>
        <div>
          Year
          <label htmlFor='list-type'>
            <select
              id='list-type'
              onChange={(event) => {
                setDisplay(event.target.value);
              }}
            >
              <option value='week'>Week</option>
              <option value='month'>Month</option>
              <option value='year'>Year</option>
            </select>
          </label>
          <div id='trans-display'></div>
          {transArray}
          <input id='new-trans'></input> <a id='add-butt'>Add Transaction</a>
        </div>
        <div id='graph'></div>
        <div id='summary'></div>
      </div>
    );
  }
};
export default MainPage;
