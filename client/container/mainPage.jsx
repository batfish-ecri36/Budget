const React = require('react');
import { useState, useEffect } from 'react';
import Monthly from '../components/Monthly.jsx';
import Yearly from '../components/Yearly.jsx';
import Weekly from '../components/Weekly.jsx';
import axios from 'axios';
import MonthlyBarChart from '../components/Chart.jsx';
('../components/Chart.jsx');

const MainPage = (props) => {
  const [newData, setNewData] = useState({
    item: '',
    category: '',
    amount: '',
    date: '',
  });
  const [display, setDisplay] = useState('all');

  //will find a way to access user id, but for now i hard coded it
  const id = props.user.id;

  // post request to add new transactions to the database
  const addExpense = async (data) => {
    try {
      const response = await axios.post(
        `/transactions/${props.user._id}`,
        data
      );
      if (response.status === 200) {
        window.alert('Expense added successfully!');
      }
      props.addTrans(data);
      const arrBox = Array.from(document.getElementsByClassName('addbox'));
      arrBox.forEach((ele) => {
        ele.value = '';
      });
    } catch (err) {
      console.log(err);
    }
  };

  //handleSubmit form to invoke addExpense function (post request) passing in the new state
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !e.target[0].value ||
      !e.target[1].value ||
      !e.target[3].value ||
      !e.target[2].value
    ) {
      console.log('here');
      window.alert('Please provide value into each input fields.');
    } else {
      addExpense(newData);
    }
  };

  // handle input onChange
  const handleInputChange = (e) => {
    const target = {};
    target[e.target.id] = e.target.value;
    // let { name, value } = e.target;
    const newObj = Object.assign({}, newData, target);
    setNewData(newObj);
  };

  const convertDate = (date) => {
    const toConvert = new Date(date);
    let converted = toConvert.toLocaleDateString('en-US', { timeZone: 'UTC' });
    return converted;
  };

  const shorten = (amount) => {
    const cut = amount.indexOf('.');
    if (cut === -1) {
      return amount + '.00';
    }
    return amount.slice(0, cut + 3);
  };

  const deleteExpense = async (data) => {
    try {
      const response = await axios.delete(`/transactions/${data}`, {
        data,
      });
      props.deleteTrans(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <MonthlyBarChart transactions={props.transactions} />
      </div>
      <h1>Peter and Andy are great too!</h1>
      <form onSubmit={handleSubmit}>
        <input
          className='addbox'
          onChange={handleInputChange}
          id='item'
          type='text'
          placeholder='Expense'
          name='expense'
          defaultValue={newData.item}
        ></input>
        <input
          className='addbox'
          onChange={handleInputChange}
          id='amount'
          type='number'
          placeholder='Amount'
          name='amount'
          step='0.01'
          min='0'
          defaultValue={newData.amount}
        ></input>
        <input
          className='addbox'
          onChange={handleInputChange}
          id='category'
          type='text'
          placeholder='Category'
          name='Category'
          defaultValue={newData.category}
        ></input>
        <input
          className='addbox'
          id='date'
          onChange={handleInputChange}
          type='date'
          name='date'
          defaultValue={newData.date}
        ></input>
        <input type='submit'></input>
      </form>
      <div className='expense-log' style={{ marginTop: '50px' }}>
        <table className='expense-table'>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: 'center',
                  borderBottom: '0.5px solid #767676',
                  borderRight: ' 0.5px solid #767676',
                }}
              >
                Expense:
              </th>
              <th
                style={{
                  textAlign: 'center',
                  borderBottom: '0.5px solid #767676',
                  borderRight: ' 0.5px solid #767676',
                }}
              >
                Amount:
              </th>
              <th
                style={{
                  textAlign: 'center',
                  borderBottom: '0.5px solid #767676',
                  borderRight: ' 0.5px solid #767676',
                }}
              >
                Date:
              </th>
              <th
                style={{
                  textAlign: 'center',
                  borderBottom: '0.5px solid #767676',
                  borderRight: ' 0.5px solid #767676',
                }}
              >
                Category:
              </th>
              <th
                style={{
                  textAlign: 'center',
                  borderBottom: '0.5px solid #767676',
                  borderRight: ' 0.5px solid #767676',
                }}
              >
                Action:
              </th>
            </tr>
          </thead>
        </table>
        <tbody>
          {props.transactions &&
            props.transactions.map((item, index) => {
              return (
                <tr id={item.item + convertDate(item.date)} key={index}>
                  <td style={{ paddingRight: '10px' }}>{item.item}</td>
                  <td style={{ paddingRight: '10px' }}>
                    ${shorten(item.amount)}
                  </td>
                  <td style={{ paddingRight: '10px' }}>{item.category}</td>
                  <td style={{ paddingRight: '10px' }}>
                    {convertDate(item.date)}
                  </td>
                  <td style={{ paddingRight: '10px' }} className='action-btn'>
                    <button
                      onClick={() => {
                        console.log('click');
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteExpense(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </div>
    </div>
  );
};
export default MainPage;

{
  /* <select id='dropdown'>
  <option value='week'>Week</option>
  <option value='month'>Month</option>
  <option value='year'>Year</option>
</select>; */
}
