import { constants } from "../../constants/global";
import HTTP from "../http";
const { TOKEN } = constants;

export const ohcl = async ({
  exchangeSegment,
  exchangeInstrumentID,
  startTime,
  endTime,
  compressionValue = 60,
}) => {
  return await HTTP.get({
    url: `${process.env.REACT_APP_API_BASE_URL}/marketdata/instruments/ohlc?exchangeSegment=${exchangeSegment}&exchangeInstrumentID=${exchangeInstrumentID}&startTime=${startTime}&endTime=${endTime}&compressionValue=${compressionValue}
`,
    requestOptions: {
      headers: {
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    },
  });
};
