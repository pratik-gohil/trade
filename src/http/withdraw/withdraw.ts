import HTTP from "../http";
import { constants } from "../../constants/global";
const { CLIENT_ID } = constants;

export const withdraw = async ({ amount, BankAccountNumber }) => {
  const response = await HTTP.get({
    url: `https://backoffice.lkp.net.in:8080/techexcelapi/index.cfm/payment/AddPayment?AccountCode=${localStorage.getItem(
      CLIENT_ID
    )}&branch_code=&company_code=NSE_CASH&Amount=${amount}&BankAccountNumber=${BankAccountNumber}&BankNo=&VOUCHERDATE=&UrlDataYear=${new Date().getFullYear()}`,
    requestOptions: {},
  });
  return response;
};
