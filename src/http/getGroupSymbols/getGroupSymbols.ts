import HTTP from "../http";

export const getGroupSymbols = async ({ groupName }) => {
  return await HTTP.get({
    url: `https://devtrade.lkp.net.in/enterprise/group/symbols?userID=${localStorage.getItem(
      "userID"
    )}&groupName=${groupName}`,
    requestOptions: {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    },
  });
};
