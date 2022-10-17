import { createSlice } from "@reduxjs/toolkit";

export interface IAuth {
  user: {
    userID: string;
    firstName: string;
    lastName: string;
    ClientId: string;
    ClientName: string;
    EmailId: string;
    IncludeInAutoSquareoff: boolean;
    IncludeInAutoSquareoffBlocked: boolean;
    IsInvestorClient: boolean;
    IsProClient: boolean;
    MobileNo: string;
    OfficeAddress: string;
    PAN: string;
    ResidentialAddress: string;
    ClientBankInfoList: IClientBankInfoList[];
  };
}

export interface IClientBankInfoList {
  ClientId: string;
  AccountNumber: string;
  AccountType: string;
  BankName: string;
  BankBranchName: string;
  BankCity: string;
  CustomerId: string;
  BankCityPincode: string;
  BankIFSCCode: string;
}

const initialState: IAuth = {
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
    ClientBankInfoList: [],
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
