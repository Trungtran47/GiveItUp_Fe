import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postData: [],
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
  },
});

export const { getDataPosts, getDataPostsSuccess, getDataPostsFailure } =
  dataPostSlice.actions;

export default dataPostSlice.reducer;
