import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  visible: true,
};

export const orderModalSlice = createSlice({
  name: "orderModal",
  initialState,
  reducers: {
    visiblityReducer: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const { visiblityReducer } = orderModalSlice.actions;

export default orderModalSlice.reducer;
