import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  order: {
    type: "BUY",
  },
};

export const orderModalSlice = createSlice({
  name: "orderModal",
  initialState,
  reducers: {
    visiblityReducer: (state, action) => {
      state.visible = action.payload.visible;
      state.order = action.payload.order;
    },
    orderTypeReducer: (state, action) => {
      state.order.type = action.payload;
    },
  },
});

export const { visiblityReducer, orderTypeReducer } = orderModalSlice.actions;

export default orderModalSlice.reducer;
