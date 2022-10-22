import { combineReducers } from 'redux';

import mainReducer from './mainReducer';

const reducers = combineReducers({
  budget: mainReducer,
});

export default reducers;
