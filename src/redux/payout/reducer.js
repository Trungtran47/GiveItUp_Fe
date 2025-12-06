import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payoutRequestsData: [],
  loading: false,
  error: null,
};

const dataPayoutRequestsSlice = createSlice({
  name: "payoutRequestsData",
  initialState,
  reducers: {
    getDataPayoutRequests: (state) => {
      state.loading = true;
    },
    getDataPayoutRequestsSuccess: (state, action) => {
      state.loading = false;
      state.payoutRequestsData = action.payload;
    },
    getDataPayoutRequestsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getDataPayoutRequests,
  getDataPayoutRequestsSuccess,
  getDataPayoutRequestsFailure,
} = dataPayoutRequestsSlice.actions;

export default dataPayoutRequestsSlice.reducer;
