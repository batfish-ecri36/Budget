import * as types from '../constants/actiontypes';

//delete
export const deleteTransaction = (transaction) => ({
  type: types.DELETE_TRANSACTION,
  payload: transaction,
});

//create
export const addTransaction = (transaction) => ({
  type: types.ADD_TRANSACTION,
  payload: transaction,
});

//update
export const updateTransactions = (transaction) => ({
  type: types.UPDATE_TRANSACTION,
  payload: transaction,
});

//read
export const loadTransactions = (transaction) => ({
  type: types.LOAD_TRANSACTIONS,
  payload: transaction,
});

export const login = (username) => ({
  type: types.LOGIN,
  payload: username,
});
