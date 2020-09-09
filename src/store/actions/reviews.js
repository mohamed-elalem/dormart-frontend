import * as actionTypes from './actionTypes';
import Axios from '../../axios';

export const fetchReviewsInit = () => ({
  type: actionTypes.REVIEW_FETCH_INIT
});

export const fetchReviewsSuccess = (reviews, currentPage, totalPages) => ({
  type: actionTypes.REVIEW_FETCH_SUCCESS,
  payload: {
    reviews, currentPage, totalPages
  }
});

export const fetchReviews = (productId, page) => dispatch => {
  dispatch(fetchReviewsInit());
  
  Axios.get(`/products/${productId}/reviews`, { params: { page }})
    .then(res => {
      dispatch(fetchReviewsSuccess(res.data.data.reviews, res.data.data.current_page, res.data.data.total_pages));
    }).catch(err => {
      console.log(err);
    });
};

export const resetReviews = () => ({
  type: actionTypes.REVIEW_RESET,
});