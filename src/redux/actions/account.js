/*
 * action types
 */
export const actionTypes = {
    SET_ACCOUNT: 'account/SET_ACCOUNT',
    SET_NEEDAUTH: 'account/SET_NEEDAUTH',
    LOG_OUT: 'LOG OUT'
  };
  /*
   * action creators
   */
  export const setAccount = data => ({
    type: actionTypes.SET_ACCOUNT,
    data,
  });
  export const setNeedAuth = data => ({
    type: actionTypes.SET_NEEDAUTH,
    data,
  });
  export const logout = data => ({
    type: actionTypes.LOG_OUT,
    data
  })
  