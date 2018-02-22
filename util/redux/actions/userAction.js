import * as actionTypes from "../types/userType";

export const setUser = ( uid, isLoggedIn ) => dispatch => {
  return dispatch({ type: actionTypes.SET_USER, uid, isLoggedIn });
};