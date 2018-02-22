import * as actionTypes from "../types/layoutType";

export const setDefaultOpenKeys = ( defaultOpenKeys ) => dispatch => {
  return dispatch({ type: actionTypes.SET_DEFAULT_OPEN_KEYS, defaultOpenKeys });
};