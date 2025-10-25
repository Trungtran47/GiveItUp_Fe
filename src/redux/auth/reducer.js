import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Sign In
    signIn: (state) => {
      state.loading = true;
      state.error = null;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.loading = false;
    },
    LOGIN_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Refresh Token
    refreshToken: (state) => {
      state.loading = true;
      state.error = null;
    },
    REFRESH_SUCCESS: (state, action) => {
      state.loading = false;
    },
    REFRESH_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Introspect
    introspectToken: (state) => {
      state.loading = true;
      state.error = null;
    },
    INTROSPECT_SUCCESS: (state, action) => {
      state.loading = false;
    },
    INTROSPECT_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout
    logout: (state) => {
      state.loading = true;
      state.error = null;
    },
    LOGOUT_SUCCESS: (state) => {
      state.loading = false;
    },
    LOGOUT_FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signIn,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  refreshToken,
  REFRESH_SUCCESS,
  REFRESH_FAILURE,
  introspectToken,
  INTROSPECT_SUCCESS,
  INTROSPECT_FAILURE,
  logout,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} = authSlice.actions;

export default authSlice.reducer;
