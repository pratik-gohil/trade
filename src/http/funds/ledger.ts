import HTTP from "../http";
import { constants } from "../../constants/global";
const { CLIENT_ID } = constants;

export const getLedger = async ({ from, to }) => {
  return await HTTP.get({
    url: `https://backoffice.lkp.net.in:8080/techexcelapi/index.cfm/Ledger/Ledger1?UrlUserName=techapi&UrlPassword=TECH@123&UrlDatabase=capsfo&UrlDataYear=${new Date().getFullYear()}&FromDate=${from}&ToDate=${to}&Client_code=${localStorage.getItem(
      CLIENT_ID
    )}&COCDLIST=&ShowMargin=&ShowAllData=&Merge_Company=Y`,
    requestOptions: {},
  });
};
