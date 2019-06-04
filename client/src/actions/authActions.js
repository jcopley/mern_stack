import axios from 'axios';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';
import { returnErrors } from './errorActions';

export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });
  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        user: res.data
      })
    )
    .catch(err => {
      console.log(err.response.data, err.response.status);
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//register user
export const register = ({ name, email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, password });

  axios
    .post('/api/users', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAIL });
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
    });
};

//login user
export const login = ({ email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LOGIN_FAIL });
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
    });
};

//logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

//set up config headers and token
export const tokenConfig = getState => {
  //get token
  const token = getState().auth.token;

  //headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  if (token) config.headers['x-auth-token'] = token;

  return config;
};
