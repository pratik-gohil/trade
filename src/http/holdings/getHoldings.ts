import { constants } from "../../constants/global";
import HTTP from "../http";
const { CLIENT_ID, TOKEN, USER_ID } = constants;

export const getHoldings = async () => {
  return await HTTP.get({
    url: `${
      process.env.REACT_APP_API_BASE_URL
    }/enterprise/portfolio/holdings?clientID=${localStorage.getItem(
      CLIENT_ID
    )}&userID=${localStorage.getItem(USER_ID)}`,
    requestOptions: {
      headers: {
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    },
  });
};
