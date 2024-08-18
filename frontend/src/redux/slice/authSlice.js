import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
// auth slice to manage the log in state of user
const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    checkAuth: (state) => {
      const token = Cookies.get('UserAuth');
      state.isAuthenticated = !!token;
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;

export default authSlice.reducer;
