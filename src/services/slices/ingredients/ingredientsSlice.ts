import { createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TTabMode } from '../../../utils/types';
import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => getIngredientsApi()
);

export const filterIngredients = (
  ingredients: TIngredient[] | null,
  type: TTabMode
) => {
  if (!ingredients) return [];
  return ingredients.filter((ingredient) => ingredient.type === type);
};

type TIngredientsState = {
  ingredients: TIngredient[] | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
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

export const ingredientsReducer = ingredientsSlice.reducer;
export const { getIngredients, getLoading } = ingredientsSlice.selectors;
