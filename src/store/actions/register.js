import * as actionTypes from './actionTypes';
import Axios from '../../axios';

export const initCustomerRegistration = () => {
  return {
    type: actionTypes.REGISTER_CUSTOMER_INIT
  };
};

export const customerRegistrationSuccess = (user) => {
  return {
    type: actionTypes.REGISTER_CUSTOMER_SUCCESS,
    payload: {
      user
    }
  };
};

export const customerRegistrationFailure = errors => {
  return {
    type: actionTypes.REGISER_CUSTOMER_FAILURE,
    payload: {
      errors
    }
  }
};

export const registerNewCustomer = customer => dispatch => {
  dispatch(initCustomerRegistration());

  const formData = new FormData();

  Object.keys(customer).forEach(key => formData.append(`customer[${key}]`, customer[key]));

  Axios.post('/customers', formData)
    .then((res) => {
      // TODO Fetch correct user data from the backend to persist it in state
      dispatch(customerRegistrationSuccess({email: 'tmp'}));
    }).catch(error => {
      dispatch(customerRegistrationFailure(error.response.data.errors));
    });
};