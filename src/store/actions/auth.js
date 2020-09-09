import Axios from '../../axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (user) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: {
    user
  }
});

export const authFailed = (error) => {
  localStorage.removeItem('token');
  return {
    type: actionTypes.AUHT_FAILED,
    payload: {
      error
    }
  };
}

export const fetchUserByToken = token => dispatch => {
  Axios.get('/me', {
    headers: {
      authorization: token,
    },
  }).then(res => {
    dispatch(authSuccess(res.data.data.user));
  }).catch(error => {
    dispatch(authFailed(error));
  });
}

export const authenticateUser = (email, password) => dispatch => {
  dispatch(authStart());
  Axios.post('/customers/sign_in', {
    customer: {
      email,
      password
    }
  }).then(res => {
    const authorization = res.headers['authorization'];
    localStorage.setItem('token', authorization);
    dispatch(fetchUserByToken(authorization));
  }).catch(error => {
    dispatch(authFailed(error.response.data.error))
  });
};

export const authenticateUserByToken = token => dispatch => {
  dispatch(fetchUserByToken(token));
};



const logoutInit = () => ({
  type: actionTypes.AUTH_LOGOUT_START
});

const logoutSuccess = () => {
  localStorage.removeItem('token');

  return {
    type: actionTypes.AUTH_LOGOUT_SUCCESS
  };
};

export const logout = () => dispatch => {
  dispatch(logoutInit());

  Axios.delete('/customers/sign_out')
    .then(() => dispatch(logoutSuccess()));
};

export const restrictedRoute = redirectUrl => {
  console.log(redirectUrl);
  return {
    type: actionTypes.AUTH_RESTRICTED_ROUTE,
    payload: {
      redirectUrl: redirectUrl || '/'
    }
  }
}
