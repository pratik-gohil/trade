import HTTP from "../http";
import { constants } from "../../constants/global";
const { TOKEN } = constants;

export const modifyOrder = async (data) => {
  const response = await HTTP.put({
    url: `${process.env.REACT_APP_API_BASE_URL}/enterprise/orders`,
    requestOptions: {
      body: JSON.stringify(data),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    },
  });
  return response;
};
