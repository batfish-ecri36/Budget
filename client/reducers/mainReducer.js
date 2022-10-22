import * as types from '../constants/actiontypes';

const initialState = {
  transactions: [],
  user: '',
  //can add a total
};

const mainReducer = (state = initialState, action) => {
  let transaction;

  switch (action.type) {
    default: {
      return { ...state };
    }
  }
};

export default mainReducer;
