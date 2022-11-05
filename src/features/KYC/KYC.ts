import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    setKycReducer: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setKycReducer } = kycSlice.actions;

export default kycSlice.reducer;
