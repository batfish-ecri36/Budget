import * as types from '../constants/actiontypes';

const initialState = {
  transactions: [],
  user: '',
};

const mainReducer = (state = initialState, action) => {
  let transactions;

  switch (action.type) {
    case types.LOGIN: {
      console.log(action.payload, 'payload');
      const user = action.payload[0];
      transactions = action.payload[1];
      console.log(transactions);
      // transactions = transactions.sort((a, b) => {
      //   return new Date(a.date) - new Date(b.date);
      // });
      return { ...state, user, transactions };
    }
    case types.ADD_TRANSACTION: {
      transactions = state.transactions.slice();
      transactions.push(action.payload);
      transactions = transactions.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      return {
        ...state,
        transactions,
      };
    }
    case types.DELETE_TRANSACTION: {
      transactions = state.transactions.slice();
      let cut;
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i]._id === action.payload) {
          cut = i;
        }
      }
      transactions = transactions
        .slice(0, cut)
        .concat(transactions.slice(cut + 1));
      return {
        ...state,
        transactions,
      };
    }
    case types.UPDATE_TRANSACTION: {
      transactions = state.transactions.slice();
      let current;
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i]._id === action.payload._id) {
          current = i;
        }
      }
      const updated = Object.assign({}, transactions[current], action.payload);
      transactions[current] = updated;
      transactions = transactions.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      return {
        ...state,
        transactions,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default mainReducer;
