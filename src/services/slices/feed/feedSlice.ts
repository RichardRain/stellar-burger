import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrdersApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFeed = createAsyncThunk('feed/fetch', getFeedsApi);

export const fetchUserOrders = createAsyncThunk('user/orders', getOrdersApi);

export const fetchOrderByNumber = createAsyncThunk(
  'feed/fetch/number',
  getOrderByNumberApi
);

type TFeedState = {
  feed: TOrder[] | null;
  userOrders: TOrder[] | null;
  currentOrders: TOrder[] | null;
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  feed: [],
  userOrders: [],
  currentOrders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeed: (state) => state.feed,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getFeedLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getUserOrders: (state) => state.userOrders,
    getCurrentOrders: (state) => state.currentOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrders = action.payload.orders;
      });
  }
});

export const feedReducer = feedSlice.reducer;
export const {
  getFeed,
  getTotal,
  getTotalToday,
  getFeedLoading,
  getError,
  getUserOrders,
  getCurrentOrders
} = feedSlice.selectors;
