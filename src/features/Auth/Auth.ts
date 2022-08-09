import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userID: "",
    firstName: "",
    lastName: "",
    ClientId: "",
    ClientName: "",
    EmailId: "",
    IncludeInAutoSquareoff: false,
    IncludeInAutoSquareoffBlocked: false,
    IsInvestorClient: true,
    IsProClient: false,
    MobileNo: "",
    OfficeAddress: "",
    PAN: "",
    ResidentialAddress: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserReducer: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserReducer } = authSlice.actions;

export default authSlice.reducer;
