import { userReducer, ingredientsReducer } from '@slices';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer
});
