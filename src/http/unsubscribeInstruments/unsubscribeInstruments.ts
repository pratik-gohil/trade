import { constants } from "../../constants/global";
import HTTP from "../http";
const { TOKEN } = constants;

export const unsubscribeInstruments = async ({
  instruments,
  xtsMessageCode = 1501,
}) => {
  const response = await HTTP.post(
    `${process.env.REACT_APP_API_BASE_URL}/marketdata/instruments/subscription`,
    {
      body: JSON.stringify({
        instruments,
        xtsMessageCode,
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
