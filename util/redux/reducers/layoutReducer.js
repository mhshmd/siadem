import * as actionTypes from "../types/layoutType";

export default (
  state = {
    defaultOpenKeys: '/',
    tittle: 'Dashboard',
    menuCollapsed: false
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_DEFAULT_OPEN_KEYS:
      return {
        ...state,
        defaultOpenKeys: action.defaultOpenKeys
      };
    case actionTypes.SET_SIDEBAR_COLLAPSED:
      return {
        ...state,
        menuCollapsed: action.menuCollapsed
      }
  }
  return state;
};
