import { createSlice } from "@reduxjs/toolkit";
import { IInstrument } from "./../../types/interfaces/instrument.interfaces.types";
import { IOrderWithMarketDepth } from "./../../components/Orders/Orders";

interface IOrderModal {
  visible: boolean;
  order: {
    orderSide: string | null;
    instrument: IInstrument | IOrderWithMarketDepth | null;
    isModify?: boolean | null;
  };
}

const initialState: IOrderModal = {
  visible: false,
  order: {
    orderSide: null,
    instrument: null,
    isModify: null,
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
