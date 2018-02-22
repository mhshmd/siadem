import * as actionTypes from "../types/layoutType";

export default (
  state = {
    defaultOpenKeys: '/',
    tittle: 'Dashboard'
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_DEFAULT_OPEN_KEYS:
      return {
        ...state,
        defaultOpenKeys: action.defaultOpenKeys
      };
  }
  return state;
};
