import * as actionTypes from '../actions/actionTypes';
const initialState = {
  user: null,
  fetching: false,
  error: null,
  redirectUrl: '/',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        fetching: false,
        error: null,
      };
    case actionTypes.AUHT_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload.error
      }
    case actionTypes.AUTH_LOGOUT_START:
      return {
        ...state,
        fetching: true
      };
    case actionTypes.AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        fetching: false,
        error: null,
      };
    case actionTypes.AUTH_RESTRICTED_ROUTE:
      return {
        ...state,
        redirectUrl: action.payload.redirectUrl
      }
    default:
      return state;
  }
};
