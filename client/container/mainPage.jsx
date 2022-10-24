const React = require('react');
import { useState, useEffect } from 'react';
import Popup from '../components/Popup.jsx';
import axios from 'axios';
import MonthlyBarChart from '../components/Chart.jsx';
import DoughnutChart from '../components/Doughnut.jsx';
import styles from '../styles/mainpage.scss';

const MainPage = (props) => {
  const [newData, setNewData] = useState({
    item: "",
    category: "",
    amount: "",
    date: "",
  });
  
  // const [display, setDisplay] = useState('all');


  console.log(props);
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
        window.alert("Expense added successfully!");
      }
      props.addTrans(data);
      const arrBox = Array.from(document.getElementsByClassName("addbox"));
      arrBox.forEach((ele) => {
        ele.value = "";
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
      console.log("here");
      window.alert("Please provide value into each input fields.");
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
    let converted = toConvert.toLocaleDateString("en-US", { timeZone: "UTC" });
    return converted;
  };

  const shorten = (amount) => {
    const cut = amount.indexOf(".");
    if (cut === -1) {
      return amount + ".00";
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

  const [buttonPopup, setButtonPopup] = useState(false);
  const [updateData, setUpdateData] = useState({});

  return (
    <div id="mainPage">
        <h1>Stop Spending All Me Money</h1>
      <div id='siteName'>
        <div id='trans-form'>
          <Popup
            trigger={buttonPopup}
            update={updateData}
            setTrigger={setButtonPopup}
          >
            <h3>POPUP</h3>
          </Popup>
          {/* <h1>Peter and Andy are great too!</h1> */}
          <form onSubmit={handleSubmit}>
            <p>Add New Expense</p>
            <input
              className="addbox"
              onChange={handleInputChange}
              id="item"
              type="text"
              placeholder="Expense"
              name="expense"
              defaultValue={newData.item}
            ></input>
            <input
              className="addbox"
              onChange={handleInputChange}
              id="amount"
              type="number"
              placeholder="Amount"
              name="amount"
              step="0.01"
              min="0"
              defaultValue={newData.amount}
            ></input>
            <input
              className="addbox"
              onChange={handleInputChange}
              id="category"
              type="text"
              placeholder="Category"
              name="Category"
              defaultValue={newData.category}
            ></input>
            <input
              className="addbox"
              id="date"
              onChange={handleInputChange}
              type="date"
              name="date"
              defaultValue={newData.date}
            ></input>
            <input id='submit' type="submit"></input>
          </form>
          <div
            id="expense-div"
            className="expense-log"
            style={{ marginTop: "50px", marginLeft: '50px' }}
          >
            <table className="expense-table">
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "center",
                      borderBottom: "0.5px solid #767676",
                      borderRight: " 0.5px solid #767676",
                      color: "#4be7b9",
                    }}
                  >
                    Expense:
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      borderBottom: "0.5px solid #767676",
                      borderRight: " 0.5px solid #767676",
                      color: "#4be7b9",
                    }}
                  >
                    Amount:
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      borderBottom: "0.5px solid #767676",
                      borderRight: " 0.5px solid #767676",
                      color: "#4be7b9",
                    }}
                  >
                    Category:
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      borderBottom: "0.5px solid #767676",
                      borderRight: " 0.5px solid #767676",
                      color: "#4be7b9",
                    }}
                  >
                    Date:
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      borderBottom: "0.5px solid #767676",
                      borderRight: " 0.5px solid #767676",
                      color: "#4be7b9",
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
                      <td id='expense' style={{ paddingRight: "10px" }}>{item.item}</td>
                      <td style={{ paddingRight: "10px", margin: '30px'}}>
                        ${shorten(item.amount)}
                      </td>
                      <td style={{ paddingRight: "10px" }}>{item.category}</td>
                      <td style={{ paddingRight: "10px" }}>
                        {convertDate(item.date)}
                      </td>
                      <td
                        style={{ paddingRight: "10px", marginLeft: '20px' }}
                        className="action-btn"
                      >
                        <button
                          onClick={() => {
                            setUpdateData(item);
                            setButtonPopup(true);
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
        <div id="charts">
          <MonthlyBarChart transactions={props.transactions} />
          <DoughnutChart transactions={props.transactions} />
        </div>
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
