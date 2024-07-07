import { expect, test } from '@jest/globals';
import {
  feedReducer,
  TFeedState,
  fetchFeed,
  fetchUserOrders,
  fetchOrderByNumber
} from './feedSlice';

describe('Проверяем слайс feedSlice', () => {
  const initialState: TFeedState = {
    feed: [],
    userOrders: [],
    currentOrders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  const testOrders = [
    {
      _id: '10',
      status: 'done',
      name: 'Заказ 1',
      createdAt: '2024-07-05T17:47:48.796Z',
      updatedAt: '2024-07-05T17:47:51.607Z',
      number: 10000,
      ingredients: [
        JSON.stringify({
          _id: '0',
          name: 'Булка 1',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png'
        })
      ]
    }
  ];

  const feedResponse = {
    success: true,
    orders: testOrders,
    total: 1,
    totalToday: 1
  };

  const TOrderResponse = {
    success: true,
    orders: testOrders
  };

  describe('Проверяем fetchFeed', () => {
    test('Состояние загрузки', () => {
      const state = feedReducer(
        { ...initialState, error: 'test error' },
        fetchFeed.pending('')
      );

      expect(state).toEqual({
        feed: [],
        userOrders: [],
        currentOrders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        error: null
      });
    });

    test('Запрос с ошибкой', () => {
      const state = feedReducer(
        { ...initialState, isLoading: true },
        fetchFeed.rejected(new Error('test error'), '')
      );

      expect(state).toEqual({
        feed: [],
        userOrders: [],
        currentOrders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: 'test error'
      });
    });

    test('Успешный запрос', () => {
      const state = feedReducer(
        { ...initialState, isLoading: true },
        fetchFeed.fulfilled(feedResponse, '')
      );

      expect(state).toEqual({
        feed: testOrders,
        userOrders: [],
        currentOrders: [],
        total: 1,
        totalToday: 1,
        isLoading: false,
        error: null
      });
    });
  });

  describe('Проверяем fetchUserOrders', () => {
    test('Состояние загрузки', () => {
      const state = feedReducer(
        { ...initialState, error: 'test error' },
        fetchUserOrders.pending('')
      );

      expect(state).toEqual({
        feed: [],
        userOrders: [],
        currentOrders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        error: null
      });
    });

    test('Запрос с ошибкой', () => {
      const state = feedReducer(
        { ...initialState, isLoading: true },
        fetchUserOrders.rejected(new Error('test error'), '')
      );

      expect(state).toEqual({
        feed: [],
        userOrders: [],
        currentOrders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: 'test error'
      });
    });

    test('Успешный запрос', () => {
      const state = feedReducer(
        { ...initialState, isLoading: true },
        fetchUserOrders.fulfilled(testOrders, '')
      );

      expect(state).toEqual({
        feed: [],
        userOrders: testOrders,
        currentOrders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      });
    });
  });

  describe('Проверяем fetchOrderByNumber', () => {
    test('Состояние загрузки', () => {
      const state = feedReducer(
        { ...initialState, error: 'test error' },
        fetchOrderByNumber.pending('', 1)
      );

      expect(state).toEqual({
        feed: [],
        userOrders: [],
        currentOrders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        error: null
      });
    });

    test('Запрос с ошибкой', () => {
      const state = feedReducer(
        { ...initialState, isLoading: true },
        fetchOrderByNumber.rejected(new Error('test error'), '', 1)
      );

      expect(state).toEqual({
        feed: [],
        userOrders: [],
        currentOrders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: 'test error'
      });
    });

    test('Успешный запрос', () => {
      const state = feedReducer(
        { ...initialState, isLoading: true },
        fetchOrderByNumber.fulfilled(TOrderResponse, '', 1)
      );

      expect(state).toEqual({
        feed: [],
        userOrders: [],
        currentOrders: testOrders,
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      });
    });
  });
});
