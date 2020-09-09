import * as actionTypes from './actionTypes';
import Axios from '../../axios';

export const startFetchingCategories = () => ({
  type: actionTypes.START_FETCHING_CATEGORIES,
});

export const fetchCategories = () => dispatch => {
  Axios.get('/categories')
    .then(res => res.data.data)
    .then(data => {
      const categories = data;
      dispatch({type: actionTypes.SET_CATEGORIES, payload: { categories }});
    });
};