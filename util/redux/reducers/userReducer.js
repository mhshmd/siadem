import * as actionTypes from "../types/userType";

export default (
  state = {
    uid: null,
    isLoggedIn: false
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        uid: action.uid,
        isLoggedIn: action.isLoggedIn
      };
  }
  return state;
};
