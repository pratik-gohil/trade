import { constants } from "../../constants/global";
import HTTP from "../http";
const { TOKEN, USER_ID } = constants;

export const getGroups = async () => {
  return await HTTP.get({
    url: `${
      process.env.REACT_APP_API_BASE_URL
    }/enterprise/group?userID=${localStorage.getItem(USER_ID)}`,
    requestOptions: {
      headers: {
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    },
  });
};
