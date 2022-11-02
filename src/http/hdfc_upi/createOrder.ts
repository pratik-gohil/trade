import HTTP from "../http";

export const createOrder = async ({
  Client_Code = "16500001",
  Client_Bank_Acno,
  Amount,
}) => {
  return await HTTP.get({
    url: `https://backoffice.lkp.net.in:8080/techexcelapi/index.cfm/PGEntry/PGEntry?&Client_Code=${Client_Code}&Bank_UPIID=TradeTrade@hdfcbank&Client_Bank_Acno=${Client_Bank_Acno}&Amount=${Amount}&Client_UPI_ID=&MICR=&UrlUserName=techapi&UrlPassword=TECH@123&UrlDatabase=capsfo&UrlDataYear=2022`,
    requestOptions: {},
  });
};
