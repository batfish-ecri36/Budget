import reducers from './reducers/index.js';
import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
  reducer: reducers,
  middleware: [thunkMiddleware],
});

export default store;
