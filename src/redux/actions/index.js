import { SET_ACCOUNT, OWNER_2_INDEX} from './type';

export const setAccount123 = (accountIndex) => ({ type: SET_ACCOUNT, payload: accountIndex })
export const getIndex = (address) => ({ type: OWNER_2_INDEX, payload: address})

export * from './account'
