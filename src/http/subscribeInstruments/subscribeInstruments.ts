import { TOKEN } from "../../constants/global";
import HTTP from "../http";

export const subscribeInstruments = async (data) => {
  const response = await HTTP.post(
    `${process.env.REACT_APP_API_BASE_URL}/marketdata/instruments/subscription`,
    {
      body: JSON.stringify({
        instruments: data,
        xtsMessageCode: 1502,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    }
  );
  return response;
};
