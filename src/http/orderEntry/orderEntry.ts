import HTTP from "../http";
import { constants } from "../../constants/global";
const { TOKEN } = constants;

export const orderEntry = async ({ data, isCover }) => {
  const response = await HTTP.post(
    `${process.env.REACT_APP_API_BASE_URL}/enterprise/orders${
      isCover ? "/cover" : ""
    }`,
    {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(TOKEN) || "",
      },
    }
  );
  return response;
};
