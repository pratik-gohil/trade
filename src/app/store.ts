import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Auth/Auth";
import kycSlice from "../features/KYC/KYC";
import orderModalSlice from "../features/orderModal/orderModal";
import tvcSlice from "./../features/TVChart/TVChart";

export const store = configureStore({
  reducer: {
    orderModal: orderModalSlice,
    auth: authSlice,
    tvc: tvcSlice,
    kyc: kycSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
