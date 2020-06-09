import {combineReducers} from 'redux';
import {setAccountReducer} from './accountReducer'
import account from './account'
export default combineReducers({
  setAccountReducer,
  account
  });