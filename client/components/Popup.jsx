const React = require('react');
import axios from 'axios';

const Popup = (props) => {
  //   console.log(props.update);

  const updateExpense = async (data) => {
    try {
      const item = document.getElementById('update-item').value;
      const category = document.getElementById('update-cat').value;
      const date = document.getElementById('update-date').value;
      const amount = document.getElementById('update-amt').value;
      const sendObj = {};
      if (item) {
        sendObj.item = item;
      }
      if (category) {
        sendObj.category = category;
      }
      if (date) {
        sendObj.date = date;
      }
      if (amount) {
        sendObj.amount = amount;
      }

      //   console.log(sendObj);

      data = Object.assign({}, data, sendObj);
      console.log(data);

      const response = await axios.put(`/transactions/${data._id}`, {
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return props.trigger ? (
    <div id='popup'>
      <div id='popup-inner'>
        <label htmlFor='update-item'>Item</label>
        <input id='update-item'></input>
        <label htmlFor='update-cat'>Category</label>
        <input id='update-cat'></input>
        <label htmlFor='update-date'>Date</label>
        <input id='update-date' type='date'></input>
        <label htmlFor='update-amt'>Amount</label>
        <input id='update-amt'></input>
      </div>
      <button
        onClick={() => {
          updateExpense(props.update);
          console.log('submit', props.update);
        }}
      >
        Submit
      </button>
      <button onClick={() => props.setTrigger(false)}>Close</button>
    </div>
  ) : (
    ''
  );
};

export default Popup;
