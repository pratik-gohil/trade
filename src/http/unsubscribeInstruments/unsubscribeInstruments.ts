import { constants } from "../../constants/global";
import HTTP from "../http";
const { TOKEN } = constants;

export const unsubscribeInstruments = async (data) => {
  const response = await HTTP.post(
    `${process.env.REACT_APP_API_BASE_URL}/marketdata/instruments/subscription`,
    {
      body: JSON.stringify({
        instruments: data,
        xtsMessageCode: 1501,
      }),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    }
  );
  return response;
};
