import * as actionTypes from '../actions/actionTypes';

const initialState = {
  fetchingCategories: false,
  categories: [],
  error: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
        fetchingCategories: false,
      };
    case actionTypes.START_FETCHING_CATEGORIES:
      return { ...state, fetchingCategories: true };
    default:
      return state;
  }
}

export default categoriesReducer;