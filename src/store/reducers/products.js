import * as actionTypes from '../actions/actionTypes';
const initialState = {
  categoryId: -1,
  products: [],
  loading: false,
  error: null,
  hasNextPage: true,
  currentPage: 0,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.PRODUCT_CLEAR:
      return {
        ...initialState,
        categoryId: state.categoryId,
      };
    case actionTypes.PRODUCTS_FETCH_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.PRODUCT_FETCH_SUCCESS:
      return {
        loading: false,
        error: null,
        products: state.products.concat(action.payload.products),
        hasNextPage: action.payload.hasNextPage,
        currentPage: action.payload.currentPage,
        categoryId: action.payload.categoryId,
      };
    case actionTypes.PRODUCT_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case actionTypes.PRODUCT_FETCH_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload.product
      }
    default:
      return state;
  }
}