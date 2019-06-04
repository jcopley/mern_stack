import {
  GET_ITEMS,
  DELETE_ITEM,
  ADD_ITEM,
  ITEMS_LOADING,
  AUTH_ERROR
} from './types';
import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('api/items')
    .then(res => dispatch({ type: GET_ITEMS, items: res.data }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`api/items/${id}`, tokenConfig(getState))
    .then(res => dispatch({ type: DELETE_ITEM, id }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};
export const addItem = item => (dispatch, getState) => {
  axios
    .post('api/items', item, tokenConfig(getState))
    .then(res => dispatch({ type: ADD_ITEM, item: res.data }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
