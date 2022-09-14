import { constants } from "../../constants/global";
import HTTP from "../http";
const { CLIENT_ID, TOKEN, USER_ID } = constants;

export const ohcl = async () => {
  return await HTTP.get({
    url: `${process.env.REACT_APP_API_BASE_URL}/marketdata/instruments/ohlc?exchangeSegment=1&exchangeInstrumentID=22&startTime=Jul%2013%202020%20090000&endTime=Jul%2013%202020%20153000&compressionValue=60
`,
    requestOptions: {
      headers: {
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    },
  });
};
