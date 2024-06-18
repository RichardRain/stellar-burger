import {
  userReducer,
  ingredientsReducer,
  feedReducer,
  orderReducer
} from '@slices';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  feed: feedReducer,
  order: orderReducer
});
