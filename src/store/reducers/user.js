import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  loading: false,
  error: null
}

const registerCustomerSuccess = (state, action) => {
  return {
    loading: false,
    user: action.payload.user,
    error: null
  };
}

const initCustomerRegistration = (state, action) => ({
  ...state,
  loading: true,
  error: null,
});

const registerCustomerFailure = (state, action) => ({
  ...state,
  loading: false,
  error: action.payload.errors
})

export default (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.REGISTER_CUSTOMER_SUCCESS: return registerCustomerSuccess(state, action);
  case actionTypes.REGISTER_CUSTOMER_INIT: return initCustomerRegistration(state, action);
  case actionTypes.REGISER_CUSTOMER_FAILURE: return registerCustomerFailure(state, action);
  default: return state;
  }
}