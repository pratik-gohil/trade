import { constants } from "../../constants/global";
import HTTP from "../http";
const { TOKEN, USER_ID } = constants;

export const getGroupSymbols = async ({ groupName }) => {
  return await HTTP.get({
    url: `${
      process.env.REACT_APP_API_BASE_URL
    }/enterprise/group/symbols?userID=${localStorage.getItem(
      USER_ID
    )}&groupName=${groupName}`,
    requestOptions: {
      headers: {
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    },
  });
};
