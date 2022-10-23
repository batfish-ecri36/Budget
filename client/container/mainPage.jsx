const React = require("react");
import { useState, useEffect } from "react";
import Transactions from "../components/Transactions.jsx";
import Monthly from "../components/Monthly.jsx";
import Yearly from "../components/Yearly.jsx";
import Weekly from "../components/Weekly.jsx";
import axios from "axios";

const initialState = {
  item: '',
  amount: '',
  date: '',
  category: '',
}

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

  //will find a way to access user id, but for now i hard coded it
  const id = 11;

  const [state, setState] = useState(initialState);
  const { item, amount, date, category} = initialState;

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

  //post request to add new transactions to the database
  const addExpense = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`/transactions/${id}`, data);
      if(response.status === 200){
        window.alert('Expense added successfully!');
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getExpenses();
  }, []);

  //handleSubmit form to invoke addExpense function (post request) passing in the new state
  const handleSubmit = (e) => {
    e.preventDefault();
    if (item === null || amount === null || date === null) {
      window.alert("Please provide value into each input fields.");
    } else {
      addExpense(state)
    }
  };

  //handle input onChange
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <h1>Peter and Andy are great too!</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={handleInputChange} type='text' placeholder='Expense' name='expense' defaultValue={item}></input>
          <input onChange={handleInputChange} type='number' placeholder='Amount' name='amount' defaultValue={amount}></input>
          <input onChange={handleInputChange} type='text' placeholder='Category' name='Category' defaultValue={category}></input>
          <input onChange={handleInputChange} type='date' name='date' defaultValue={date}></input>
          <input type='submit'></input>
        </form>
        <div className='expense-log' style={{ marginTop: "50px" }}>
          <table className='expense-table'>
            <thead>
              <tr>
                <th style={{ textAlign: "center", borderBottom: '0.5px solid #767676', borderRight: ' 0.5px solid #767676'}}>Expense:</th>
                <th style={{ textAlign: "center", borderBottom: '0.5px solid #767676', borderRight: ' 0.5px solid #767676' }}>Amount:</th>
                <th style={{ textAlign: "center", borderBottom: '0.5px solid #767676', borderRight: ' 0.5px solid #767676' }}>Date:</th>
                <th style={{ textAlign: "center", borderBottom: '0.5px solid #767676', borderRight: ' 0.5px solid #767676' }}>Category:</th>
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
                  <td style={{ paddingRight: '10px'}}>{item.category}</td>
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