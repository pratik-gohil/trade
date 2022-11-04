import HTTP from "../http";
import { constants } from "../../constants/global";
const { CLIENT_ID } = constants;

export const createOrder = async ({ Client_Bank_Acno, Amount }) => {
  return await HTTP.get({
    url: `https://backoffice.lkp.net.in:8080/techexcelapi/index.cfm/PGEntry/PGEntry?&Client_Code=${localStorage.getItem(
      CLIENT_ID
    )}&Bank_UPIID=TradeTrade@hdfcbank&Client_Bank_Acno=${Client_Bank_Acno}&Amount=${Amount}&Client_UPI_ID=&MICR=&UrlUserName=techapi&UrlPassword=TECH@123&UrlDatabase=capsfo&UrlDataYear=${new Date().getFullYear()}`,
    requestOptions: {},
  });
};
