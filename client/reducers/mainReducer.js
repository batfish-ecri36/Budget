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
  let transaction;

  switch (action.type) {
    // case LOGIN: {
    //   console.log(action.payload);
    //   return { state };
    // }
    default: {
      return { ...state };
    }
  }
};

export default mainReducer;
