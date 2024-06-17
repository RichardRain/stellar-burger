import { createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TTabMode } from '../utils/types';
import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
  'orders/fetchIngredients',
  async () => getIngredientsApi()
);

export const filterIngredients = (
  ingredients: TIngredient[] | null,
  type: TTabMode
) => {
  if (!ingredients) return [];
  return ingredients.filter((ingredient) => ingredient.type === type);
};

type TOrderState = {
  orders: TOrder[] | null;
  ingredients: TIngredient[] | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orders: [],
  ingredients: [],
  isLoading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const reducer = ordersSlice.reducer;
export const { getIngredients, getLoading } = ordersSlice.selectors;
