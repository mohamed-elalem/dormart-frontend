import * as actionTypes from '../actions/actionTypes';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalPages: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.REVIEW_RESET:
    return initialState;
  case actionTypes.REVIEW_FETCH_INIT:
    return {
      ...state,
      loading: true,
    }
  case actionTypes.REVIEW_FETCH_SUCCESS:
    const { payload: { currentPage, totalPages, reviews } } = action;
    return {
      ...state,
      currentPage,
      totalPages,
      reviews,
      loading: false,
    };
  };

  return state;
}