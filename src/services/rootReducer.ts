import { reducer as userReducer } from '../slices/userSlice';
import { reducer as ordersReducer } from '../slices/ordersSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  user: userReducer,
  orders: ordersReducer
});
