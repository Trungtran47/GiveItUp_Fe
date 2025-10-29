import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategory: [],
  loading: false,
  error: null,
};

const dataCategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getDataCategories: (state) => {
      state.loading = true;
    },
    getDataCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.allCategory = action.payload;
    },
    getDataCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getDataCategories,
  getDataCategoriesSuccess,
  getDataCategoriesFailure,
} = dataCategorySlice.actions;

export default dataCategorySlice.reducer;
