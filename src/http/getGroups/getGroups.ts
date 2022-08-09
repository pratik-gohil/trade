import { TOKEN, USER_ID } from "../../constants/global";
import HTTP from "../http";

export const getGroups = async () => {
  return await HTTP.get({
    url: `https://devtrade.lkp.net.in/enterprise/group?userID=${localStorage.getItem(
      USER_ID
    )}`,
    requestOptions: {
      headers: {
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    },
  });
};
