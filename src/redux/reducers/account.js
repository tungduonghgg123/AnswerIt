import { decode as codecDecode, toString as codecToString } from '@iceteachain/common/src/codec';
import { actionTypes } from '../actions/account';
import {getWeb3} from '../../web3'
import {milliseconds2Date} from '../../helper/common'
const initialState = {
  needAuth: false,
  publicKey: '',
  cipher: '',
  address: '',
  privateKey: '',
  tokenAddress: '',
  tokenKey: '',
  expireAfter: '',
  expireAfter2Date: '',
  mnemonic: '',
  encryptedData: '',
  displayName: '',
  mode: '',
  point: '',
  ...(function getSessionStorage() {
    const resp = {};
    const sessionData = sessionStorage.getItem('sessionData') || localStorage.getItem('sessionData');
    console.log('session storage:', sessionStorage.getItem('sessionData'))
    console.log('local: ', localStorage.getItem('sessionData'))
    if (sessionData) {
      const token = codecDecode(Buffer.from(sessionData, 'base64'));
      console.log(token)
      const expiredSoon = process.env.REACT_APP_CONTRACT !== token.contract || token.expireAfter - Date.now() < 60 * 1000;
      resp.expireAfter2Date = milliseconds2Date(token.expireAfter)
      if (!expiredSoon) {
        console.log('not expired soon')
        resp.tokenKey = codecToString(token.tokenKey);
        getWeb3().wallet.importAccount(token.tokenKey);
        resp.tokenAddress = token.tokenAddress;
      }
      resp.expireAfter = token.expireAfter;
    }

    let user = localStorage.getItem('user') || sessionStorage.getItem('user');
    // eslint-disable-next-line no-cond-assign
    if ((user = (user && JSON.parse(user)) || {}).address) {
      resp.address = user.address;
      resp.mode = user.mode; //  0: privatekey - 1: mnemonic
      resp.encryptedData = user.keyObject;
    }

    return resp;
  })(),
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACCOUNT:
      return { ...state, ...action.data };

    case actionTypes.SET_NEEDAUTH:
      return { ...state, needAuth: action.data };
    
    case actionTypes.LOG_OUT:
      return initialState
    default:
      return state;
  }
};

export default account;
