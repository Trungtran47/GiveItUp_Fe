import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postData: [],
  allPosts: [],
  loading: false,
  error: null,
};

const dataPostSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {
    getDataPosts: (state) => {
      state.loading = true;
    },
    getDataPostsSuccess: (state, action) => {
      state.loading = false;
      state.postData = action.payload;
    },
    getDataPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllPosts: (state) => {
      state.loading = true;
    },
    getAllPostsSuccess: (state, action) => {
      state.loading = false;
      state.allPosts = action.payload;
    },
    getAllPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getDataPosts,
  getDataPostsSuccess,
  getDataPostsFailure,
  getAllPosts,
  getAllPostsSuccess,
  getAllPostsFailure,
} = dataPostSlice.actions;

export default dataPostSlice.reducer;
