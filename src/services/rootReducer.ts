import { userReducer, ordersReducer } from '@slices';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  user: userReducer,
  orders: ordersReducer
});
