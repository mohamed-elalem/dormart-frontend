import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import authReducer from './auth';
import userReducer from './user';
import productsReducer from './products';
import reviewsReducer from './reviews';

export default combineReducers({
  categories: categoriesReducer,
  auth: authReducer,
  user: userReducer,
  products: productsReducer,
  reviews: reviewsReducer,
});