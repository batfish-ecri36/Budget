import * as types from '../constants/actiontypes';

// {
//     date:
//     item:
//     amount:
//     category:
// }

const initialState = {
  transactions: [],
  user: '',
  //can add a total
};

const mainReducer = (state = initialState, action) => {
  let transactions;

  switch (action.type) {
    case types.LOGIN: {
      const user = action.payload[0];
      transactions = action.payload[1];
      return { ...state, user, transactions };
    }
    case types.ADD_TRANSACTION: {
      transactions = state.transactions.slice();
      transactions.push(action.payload);
      return {
        ...state,
        transactions,
      };
    }
    case types.DELETE_TRANSACTION: {
      console.log(action.payload);
    }
    case types.UPDATE_TRANSACTION: {
      console.log(action.payload);
    }
    default: {
      return { ...state };
    }
  }
};

export default mainReducer;
