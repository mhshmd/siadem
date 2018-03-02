export const addEvent = ( eventName, cb ) => dispatch => {
    return dispatch({ type: 'ADD_EVENT', eventName, cb });
};