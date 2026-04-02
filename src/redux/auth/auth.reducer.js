import {createSlice} from '@reduxjs/toolkit';
import {loginRequest, logoutRequest} from './auth.action';

const INITIAL_STATE = {
  isLoading: false,
  isLoggedIn: false,
  userData: {},
  userId: '',
  rememberMe: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.userData = {};
      state.userId = '';
    },
    setRememberMe: (state, action) => {
      state.rememberMe = Boolean(action.payload);
    },
    setUserData: (state, action) => {
      const payload = action.payload || {};
      state.userData = payload;
      state.userId =
        payload?._id || payload?.id || payload?.user?._id || payload?.user?.id || '';
      state.isLoggedIn = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logoutRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutRequest.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logoutRequest.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {reset, setUserData, setRememberMe} = authSlice.actions;

export default authSlice.reducer;
