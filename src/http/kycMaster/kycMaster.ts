import { constants } from "../../constants/global";
import HTTP from "../http";
const { CLIENT_ID } = constants;

export const getKycMaster = async () => {
  return await HTTP.get({
    url: `https://backoffice.lkp.net.in:8080/techexcelapi/index.cfm/kycMaster/GetMaster?ClientCode=${localStorage.getItem(
      CLIENT_ID
    )}&UrlUserName=techapi&UrlPassword=TECH@123&UrlDatabase=capsfo&UrlDataYear=${new Date().getFullYear()}`,
    requestOptions: {},
  });
};
