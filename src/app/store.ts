import { configureStore } from "@reduxjs/toolkit";
import orderModalSlice from "../features/orderModal/orderModal";

export const store = configureStore({
  reducer: {
    orderModal: orderModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
