import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  TLoginData,
  registerUserApi,
  TRegisterData,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { deleteCookie, setCookie } from '../../../utils/cookie';

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => {
    const data = await loginUserApi(loginData);
    if (data?.success) {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const getUser = createAsyncThunk(
  'user/get',
  async () => await getUserApi()
);

export const updateUserData = createAsyncThunk(
  'user/update',
  async (updateData: Partial<TRegisterData>) => await updateUserApi(updateData)
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const data = await logoutApi();
  if (data?.success) {
    deleteCookie('accessToken');
    localStorage.clear();
  }
  return data;
});

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  error: string | null;
  success: boolean;
  request: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  error: null,
  success: false,
  request: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserData: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getUserError: (state) => state.error,
    getUserSuccess: (state) => state.success,
    getUserRequest: (state) => state.request
  },
  extraReducers: (builder) => {
    builder
      // Вход
      .addCase(loginUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message ?? null;
        state.isAuthChecked = true;
        console.log(state.error);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message ?? null;
        console.log(state.error);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload.user;
        state.success = true;
      })
      // Получение данных пользователя
      .addCase(getUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message ?? null;
        state.isAuthChecked = true;
        console.log(state.error);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      // Изменение данных пользователя
      .addCase(updateUserData.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message ?? null;
        console.log(state.error);
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload.user;
        state.success = true;
      })
      // Выход
      .addCase(logoutUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message ?? null;
        console.log(state.error);
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = initialState.user;
        state.isAuthenticated = false;
      });
  }
});

export const userReducer = userSlice.reducer;
export const {
  getUserData,
  getIsAuthChecked,
  getIsAuthenticated,
  getUserError,
  getUserSuccess,
  getUserRequest
} = userSlice.selectors;
