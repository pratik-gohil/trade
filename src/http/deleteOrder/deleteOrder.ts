import { constants } from "../../constants/global";
import HTTP from "../http";
const { CLIENT_ID, TOKEN, USER_ID } = constants;

export const deleteOrder = async ({ appOrderID }: { appOrderID: number }) => {
  return await HTTP.delete({
    url: `${
      process.env.REACT_APP_API_BASE_URL
    }/enterprise/orders?appOrderID=${appOrderID}&clientID=${localStorage.getItem(
      CLIENT_ID
    )}&userID=${localStorage.getItem(USER_ID)}`,
    requestOptions: {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    },
  });
};
