import { IInstrument } from "./../../types/interfaces/instrument.interfaces.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IOrderModal {
  visible: boolean;
  order: {
    orderSide: string | null;
    instrument: IInstrument | null;
  };
}

const initialState: IOrderModal = {
  visible: false,
  order: {
    orderSide: null,
    instrument: null,
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
    orderSideReducer: (state, action) => {
      state.order.orderSide = action.payload;
    },
  },
});

export const { visiblityReducer, orderSideReducer } = orderModalSlice.actions;

export default orderModalSlice.reducer;
