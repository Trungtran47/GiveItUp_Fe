import { createSlice } from "@reduxjs/toolkit";
import { all } from "axios";
import { get } from "http";

const initialState = {
  dataUser: null,
  allUser: [],
  allAuthor: [],
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
    clearUserData: (state) => {
      state.dataUser = null;
      state.allUser = [];
    },

    // get all user
    getAllUser: (state) => {
      state.loading = true;
    },
    getAllUserSuccess: (state, action) => {
      state.loading = false;
      state.allUser = action.payload;
    },
    getAllUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //get all author
    getAllAuthor: (state) => {
      state.loading = true;
    },
    getAllAuthorSuccess: (state, action) => {
      state.loading = false;
      state.allAuthor = action.payload;
    },
    getAllAuthorFailure: (state, action) => {
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
  clearUserData,
  registerUser,
  registerSuccess,
  registerFailure,
  getAllUser,
  getAllUserSuccess,
  getAllUserFailure,
  getAllAuthor,
  getAllAuthorSuccess,
  getAllAuthorFailure,
} = dataUserSlice.actions;

export default dataUserSlice.reducer;
