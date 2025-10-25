import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataUser: null,
  loading: false,
  error: null,
};

const dataUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getDataUser: (state) => {
      state.loading = true;
    },
    getDataUserSuccess: (state, action) => {
      state.loading = false;
      state.dataUser = action.payload;
    },
    getDataUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // register
    registerUser: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getDataUser,
  getDataUserSuccess,
  getDataUserFailure,
  registerUser,
  registerSuccess,
  registerFailure,
} = dataUserSlice.actions;

export default dataUserSlice.reducer;
