import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const orderBurger = createAsyncThunk('order/post', orderBurgerApi);

type TOrderState = {
  orderItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderName: string;
  orderModalData: TOrder | null;
  orderError: string | null;
};

type TMoveIngredientPayload = {
  ingredient: TConstructorIngredient;
  direction: 'up' | 'down';
};

const initialState: TOrderState = {
  orderItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  orderName: '',
  orderError: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.orderItems.bun = action.payload;
        } else {
          state.orderItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        const ingredientWithId: TConstructorIngredient = {
          ...ingredient,
          id
        };
        return { payload: ingredientWithId };
      }
    },
    moveIngredient: (state, action: PayloadAction<TMoveIngredientPayload>) => {
      const { ingredient, direction } = action.payload;
      let array = [...state.orderItems.ingredients];
      let ingredientIndex = array.findIndex(
        (item) => item.id === ingredient.id
      );

      if (!isNaN(ingredientIndex) && ingredientIndex >= 0) {
        const itemToMove = array[ingredientIndex];
        array.splice(ingredientIndex, 1);
        switch (direction) {
          case 'up':
            if (ingredientIndex > 0) {
              array.splice(ingredientIndex - 1, 0, itemToMove);
            }
            break;
          case 'down':
            array.splice(ingredientIndex + 1, 0, itemToMove);
            break;
        }
      }

      state.orderItems.ingredients = array;
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      let array = [...state.orderItems.ingredients];
      array = array.filter((item) => item.id !== action.payload.id);
      state.orderItems.ingredients = array;
    },
    clearOrder: (state) => {
      state.orderItems = initialState.orderItems;
      state.orderRequest = false;
      state.orderModalData = null;
      state.orderName = '';
      state.orderError = null;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData,
    getOrderItems: (state) => state.orderItems
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message ?? null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.orderName = action.payload.name;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { getOrderRequest, getOrderModalData, getOrderItems } =
  orderSlice.selectors;
export const { addIngredient, moveIngredient, deleteIngredient, clearOrder } =
  orderSlice.actions;
