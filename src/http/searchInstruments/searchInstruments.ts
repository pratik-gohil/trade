import { TOKEN } from "../../constants/global";
import HTTP from "../http";

export const searchInstruments = async (data) => {
  const response = await HTTP.post(
    `${process.env.REACT_APP_API_BASE_URL}/marketdata/search/instrumentsbyid`,
    {
      body: JSON.stringify({
        instruments: data,
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
