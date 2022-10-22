import React from 'react';
import { useState } from 'react';

transactions: [
  {
    date: '',
    item: '',
    amount: '',
    category: '',
  },
];



const Transactions = (props) => {
  return (
    <div className='transactions'>
      <div>
        <label htmlFor='date'>Date:</label>
        <span id='date'>{date}</span>
      </div>
      <div>
        <label htmlFor='item'>Transaction:</label>
        <span id='item'>{item}</span>
      </div>
      <label htmlFor='amount'>Amount:</label>
      <span id='amount'>{amount}</span>
      <div>
        <label htmlFor='category'>Category:</label>
        <span id='category'>{category}</span>
      </div>
    </div>
  );
};

export default Transactions;
