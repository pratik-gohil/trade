import { createSlice } from "@reduxjs/toolkit";

const initialState: any[] = [];

export const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    setKycReducer: (_, action) => {
      return action.payload;
    },
  },
});

export const { setKycReducer } = kycSlice.actions;

export default kycSlice.reducer;
