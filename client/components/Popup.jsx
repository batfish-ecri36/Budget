const React = require('react');
import axios from 'axios';

const Popup = (props) => {
  console.log(props.data);

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
      data = Object.assign({}, data, sendObj);
      console.log(data, 'hello');
      console.log(data.user_id, 'id');
      const response = await axios.put(`/transactions/${data.user_id}`, data);
      props.update(data);
    } catch (error) {
      console.log(error);
    }
  };

  return props.trigger ? (
    <div id='popup'>
      <div id='popup-inner'>
        <h3>Edit Expense</h3>
        <label htmlFor='update-item'>Item</label>
        <input id='update-item'></input>
        <label htmlFor='update-cat'>Category</label>
        <input id='update-cat'></input>
        <label htmlFor='update-date'>Date</label>
        <input id='update-date' type='date'></input>
        <label htmlFor='update-amt'>Amount</label>
        <input id='update-amt'></input>
        <div id='popup-butt'>
          <button
            id='submit-edit'
            style={{ marginLeft: '958px' }}
            onClick={() => {
              updateExpense(props.data);
              props.setTrigger(false);
            }}
          >
            Submit
          </button>
          <button
            style={{ position: 'absolute', top: '16px', right: '20px' }}
            className='close-btn'
            onClick={() => props.setTrigger(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
};

export default Popup;
