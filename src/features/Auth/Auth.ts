import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  // userID?: string;
  ClientId: string;
  ClientName: string;
  EmailId: string;
  MobileNo: string;
  PAN: string;
  DematAccountNumber: string;
  IncludeInAutoSquareoff: boolean;
  IncludeInAutoSquareoffBlocked: boolean;
  IsProClient: boolean;
  IsInvestorClient: boolean;
  ResidentialAddress: string;
  OfficeAddress: string;
  ClientBankInfoList: IClientBankInfoList[];
  ClientExchangeDetailsList: ClientExchangeDetailsList | {};
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

export interface ClientExchangeDetailsList {
  NSECM: NSECM;
  NSEFO: NSECM;
  NSECD: NSECM;
  BSECM: NSECM;
  MCXFO: NSECM;
}

export interface NSECM {
  ClientId: string;
  ExchangeSegNumber: number;
  Enabled: boolean;
  ParticipantCode: string;
}

export interface IAuth {
  user: IUser;
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
    ClientExchangeDetailsList: {},
    DematAccountNumber: "",
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
