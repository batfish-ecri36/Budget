const React = require("react");
import { useState, useEffect } from "react";
import Transactions from "../components/Transactions.jsx";
import Monthly from "../components/Monthly.jsx";
import Yearly from "../components/Yearly.jsx";
import Weekly from "../components/Weekly.jsx";
import axios from "axios";

const MainPage = (props) => {
  const transArray = [];
  props.transactions.forEach((transaction) => {
    <Transactions
      date={transaction.date}
      item={transaction.item}
      amount={transaction.amount}
      category={transaction.category}
    />;
  });

  console.log(props)
  //will find a way to access user id, but for now i hard coded it
  const id = 11;

  const [transactions, setTransactions] = useState([]);

  //how to access the current user in state?

  const getExpenses = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({})
    };
    //can only access data from back by send a get request with an id passed in
    const response = await fetch(`/transactions/${id}`);
    const data = await response.json();
    console.log(data);
    setTransactions(data);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div>
      <h1>Peter and Andy are great too!</h1>
        <form onSubmit={(()=> console.log('submit'))}>
          <input onChange={(()=> console.log('enter expense'))} type='text' placeholder='Expense'></input>
          <input onChange={(()=> console.log('enter amount'))} type='number' placeholder='Amount'></input>
          <input onChange={(()=> console.log('submit'))} type='date'></input>
          <input type='submit'></input>
        </form>
        <div className='expense-log' style={{ marginTop: "50px" }}>
          <table className='expense-table'>
            <thead>
              <tr>
                <th style={{ textAlign: "center", borderBottom: '0.5px solid #767676', borderRight: ' 0.5px solid #767676'}}>Expense:</th>
                <th style={{ textAlign: "center", borderBottom: '0.5px solid #767676', borderRight: ' 0.5px solid #767676' }}>Amount:</th>
                <th style={{ textAlign: "center", borderBottom: '0.5px solid #767676', borderRight: ' 0.5px solid #767676' }}>Date:</th>
                <th style={{ textAlign: "center", borderBottom: '0.5px solid #767676', borderRight: ' 0.5px solid #767676' }}>Action:</th>
              </tr>
            </thead>
          </table>
          <tbody>
            {transactions && transactions.map((item, index) => {
              return (
                <tr key={index}>
                  <td style={{ paddingRight: '10px'}}>{item.item}</td>
                  <td style={{ paddingRight: '10px'}}>${item.amount}</td>
                  <td style={{ paddingRight: '10px'}}>{item.date}</td>
                  <td style={{ paddingRight: '10px'}} className='action-btn'>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </div>
    </div>
  )

}
export default MainPage;
