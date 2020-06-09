import {combineReducers} from 'redux';
import {setAccountReducer} from './accountReducer'
import account from './account'
import create from './create'
export default combineReducers({
  setAccountReducer,
  account, create,
  });