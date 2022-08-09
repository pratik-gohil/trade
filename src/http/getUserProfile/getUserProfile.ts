import { CLIENT_ID, TOKEN, USER_ID } from "../../constants/global";
import HTTP from "../http";

export const getUserProfile = async () => {
  return await HTTP.get({
    url: `https://devtrade.lkp.net.in/enterprise/user/profile?clientID=${localStorage.getItem(
      CLIENT_ID
    )}&userID=${localStorage.getItem(USER_ID)}`,
    requestOptions: {
      headers: {
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    },
  });
  // return await fetch(
  //   `https://devtrade.lkp.net.in/enterprise/user/profile?clientID=${localStorage.getItem(
  //     CLIENT_ID
  //   )}&userID=${localStorage.getItem(USER_ID)}`,
  //   {
  // headers: {
  //   Authorization: localStorage.getItem(TOKEN) || "",
  // },
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((data) => data)
  //   .catch((err) => err);
};
