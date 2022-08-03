import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Auth/Auth";
import orderModalSlice from "../features/orderModal/orderModal";

export const store = configureStore({
  reducer: {
    orderModal: orderModalSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
