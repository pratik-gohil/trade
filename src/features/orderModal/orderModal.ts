import { Instrument } from "./../../types/interfaces/instrument.interfaces.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IOrderModal {
  visible: boolean;
  order: {
    type: string | null;
    instrument: Instrument | null;
  };
}

const initialState: IOrderModal = {
  visible: false,
  order: {
    type: null,
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
    orderTypeReducer: (state, action) => {
      state.order.type = action.payload;
    },
  },
});

export const { visiblityReducer, orderTypeReducer } = orderModalSlice.actions;

export default orderModalSlice.reducer;
