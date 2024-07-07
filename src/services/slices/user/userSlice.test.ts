import { expect, test } from '@jest/globals';
import {
  userReducer,
  loginUser,
  registerUser,
  getUser,
  updateUserData,
  logoutUser,
  TUserState
} from './userSlice';

describe('Проверяем слайс userSlice', () => {
  // Тестовые данные
  const initialState: TUserState = {
    user: null,
    isAuthChecked: false,
    isAuthenticated: false,
    error: null,
    success: false,
    request: false
  };

  const loginData = {
    email: 'test@test.com',
    password: 'test'
  };

  const authResponse = {
    refreshToken: 'test-refresh-token',
    accessToken: 'test-access-token',
    user: {
      email: 'test@test.com',
      name: 'Test User'
    },
    success: true
  };

  const userResponse = {
    user: {
      email: 'test@test.com',
      name: 'Test User'
    },
    success: true
  };

  const registerData = {
    email: 'test@test.com',
    name: 'Test User',
    password: 'test'
  };

  const updateData = {
    email: 'new@email.com'
  };

  const updatedUserResponse = {
    user: {
      email: 'new@email.com',
      name: 'Test User'
    },
    success: true
  };

  describe('Проверяем loginUser', () => {
    test('Состояние загрузки', () => {
      const state = userReducer(
        { ...initialState, error: 'test error' },
        loginUser.pending('', loginData)
      );

      expect(state).toEqual({
        user: null,
        isAuthChecked: false,
        isAuthenticated: false,
        error: null,
        success: false,
        request: true
      });
    });

    test('Запрос с ошибкой', () => {
      const state = userReducer(
        { ...initialState, request: true },
        loginUser.rejected(new Error('test error'), '', loginData)
      );

      expect(state).toEqual({
        user: null,
        isAuthChecked: true,
        isAuthenticated: false,
        error: 'test error',
        success: false,
        request: false
      });
    });

    test('Успешный запрос', () => {
      const state = userReducer(
        { ...initialState, request: true },
        loginUser.fulfilled(authResponse, '', loginData)
      );

      expect(state).toEqual({
        user: {
          email: 'test@test.com',
          name: 'Test User'
        },
        isAuthChecked: true,
        isAuthenticated: true,
        error: null,
        success: false,
        request: false
      });
    });
  });

  describe('Проверяем registerUser', () => {
    test('Состояние загрузки', () => {
      const state = userReducer(
        { ...initialState, error: 'test error' },
        registerUser.pending('', registerData)
      );

      expect(state).toEqual({
        user: null,
        isAuthChecked: false,
        isAuthenticated: false,
        error: null,
        success: false,
        request: true
      });
    });

    test('Запрос с ошибкой', () => {
      const state = userReducer(
        { ...initialState, request: true },
        registerUser.rejected(new Error('test error'), '', registerData)
      );

      expect(state).toEqual({
        user: null,
        isAuthChecked: false,
        isAuthenticated: false,
        error: 'test error',
        success: false,
        request: false
      });
    });

    test('Успешный запрос', () => {
      const state = userReducer(
        { ...initialState, request: true },
        registerUser.fulfilled(authResponse, '', registerData)
      );

      expect(state).toEqual({
        user: {
          email: 'test@test.com',
          name: 'Test User'
        },
        isAuthChecked: false,
        isAuthenticated: false,
        error: null,
        success: true,
        request: false
      });
    });
  });

  describe('Проверяем getUser', () => {
    test('Состояние загрузки', () => {
      const state = userReducer(
        { ...initialState, error: 'test error' },
        getUser.pending('')
      );

      expect(state).toEqual({
        user: null,
        isAuthChecked: false,
        isAuthenticated: false,
        error: null,
        success: false,
        request: true
      });
    });

    test('Запрос с ошибкой', () => {
      const state = userReducer(
        { ...initialState, request: true },
        getUser.rejected(new Error('test error'), '')
      );

      expect(state).toEqual({
        user: null,
        isAuthChecked: true,
        isAuthenticated: false,
        error: 'test error',
        success: false,
        request: false
      });
    });

    test('Успешный запрос', () => {
      const state = userReducer(
        { ...initialState, request: true },
        getUser.fulfilled(userResponse, '')
      );

      expect(state).toEqual({
        user: {
          email: 'test@test.com',
          name: 'Test User'
        },
        isAuthChecked: true,
        isAuthenticated: true,
        error: null,
        success: false,
        request: false
      });
    });
  });

  describe('Проверяем updateUserData', () => {
    test('Состояние загрузки', () => {
      const state = userReducer(
        {
          ...initialState,
          error: 'test error',
          user: { email: 'test@test.com', name: 'Test User' }
        },
        updateUserData.pending('', updateData)
      );

      expect(state).toEqual({
        user: {
          email: 'test@test.com',
          name: 'Test User'
        },
        isAuthChecked: false,
        isAuthenticated: false,
        error: null,
        success: false,
        request: true
      });
    });

    test('Запрос с ошибкой', () => {
      const state = userReducer(
        {
          ...initialState,
          request: true,
          user: { email: 'test@test.com', name: 'Test User' }
        },
        updateUserData.rejected(new Error('test error'), '', updateData)
      );

      expect(state).toEqual({
        user: {
          email: 'test@test.com',
          name: 'Test User'
        },
        isAuthChecked: false,
        isAuthenticated: false,
        error: 'test error',
        success: false,
        request: false
      });
    });

    test('Успешный запрос', () => {
      const state = userReducer(
        {
          ...initialState,
          request: true,
          user: { email: 'test@test.com', name: 'Test User' }
        },
        updateUserData.fulfilled(updatedUserResponse, '', updateData)
      );

      expect(state).toEqual({
        user: {
          email: 'new@email.com',
          name: 'Test User'
        },
        isAuthChecked: false,
        isAuthenticated: false,
        error: null,
        success: true,
        request: false
      });
    });
  });

  describe('Проверяем logoutUser', () => {
    test('Состояние загрузки', () => {
      const state = userReducer(
        {
          ...initialState,
          error: 'test error',
          isAuthenticated: true,
          user: { email: 'test@test.com', name: 'Test User' }
        },
        logoutUser.pending('')
      );

      expect(state).toEqual({
        user: {
          email: 'test@test.com',
          name: 'Test User'
        },
        isAuthChecked: false,
        isAuthenticated: true,
        error: null,
        success: false,
        request: true
      });
    });

    test('Запрос с ошибкой', () => {
      const state = userReducer(
        {
          ...initialState,
          request: true,
          isAuthenticated: true,
          user: { email: 'test@test.com', name: 'Test User' }
        },
        logoutUser.rejected(new Error('test error'), '')
      );

      expect(state).toEqual({
        user: {
          email: 'test@test.com',
          name: 'Test User'
        },
        isAuthChecked: false,
        isAuthenticated: true,
        error: 'test error',
        success: false,
        request: false
      });
    });

    test('Успешный запрос', () => {
      const state = userReducer(
        {
          ...initialState,
          request: true,
          isAuthenticated: true,
          user: { email: 'test@test.com', name: 'Test User' }
        },
        logoutUser.fulfilled({ success: true }, '')
      );

      expect(state).toEqual({
        user: null,
        isAuthChecked: false,
        isAuthenticated: false,
        error: null,
        success: false,
        request: false
      });
    });
  });
});
