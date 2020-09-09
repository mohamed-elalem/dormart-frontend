import * as actionTypes from './actionTypes';
import Axios from '../../axios';

export const fetchProductsInit = () => ({
  type: actionTypes.PRODUCTS_FETCH_INIT,
});

export const fetchProductsSuccess = (categoryId, products, hasNextPage, currentPage) => ({
  type: actionTypes.PRODUCT_FETCH_SUCCESS,
  payload: {
    categoryId,
    products,
    hasNextPage,
    currentPage
  }
});

export const fetchProductsFailure = () => ({
  type: actionTypes.PRODUCT_FETCH_FAILURE,
});

export const fetchProducts = (categoryId, page) => dispatch => {
  dispatch(fetchProductsInit())
  Axios.get(`categories/${categoryId}/products`, {
    params: {
      page
    }
  }).then(res => {
    const hasNextPage = +res.data.data.current_page < +res.data.data.total_pages;
    dispatch(fetchProductsSuccess(categoryId, res.data.data.products, hasNextPage, res.data.data.current_page));
  }).catch(error => {
    // TODO handle error case
    console.log(error);
    dispatch(fetchProductsFailure());
  });
};

export const resetProducts = () => ({
  type: actionTypes.PRODUCT_CLEAR,
});

export const resetAndFetchProducts = (categoryId, page) => dispatch => {
  dispatch(resetProducts());
  dispatch(fetchProducts(categoryId, page));
};

export const fetchSingleProductSuccess = (product) => ({
  type: actionTypes.PRODUCT_FETCH_SINGLE_SUCCESS,
  payload: {
    product
  }
});

export const fetchSingleProductFailure = error => ({
  type: actionTypes.PRODUCT_FETCH_SINGLE_FAILURE,
  payload: {
    error
  }
});

export const fetchSingleProduct = (categoryId, productId) => dispatch => {
  dispatch(fetchProductsInit());

  Axios.get(`/categories/${categoryId}/products/${productId}`)
    .then(res => {
      dispatch(fetchSingleProductSuccess(res.data.data.product));
    })
    .catch(err => {
      console.log(err);
      dispatch(fetchSingleProductFailure(err));
    });
};