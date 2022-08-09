import HTTP from "../http";

export const getGroups = async () => {
  return await HTTP.get({
    url: `https://devtrade.lkp.net.in/enterprise/group?userID=${localStorage.getItem(
      "userID"
    )}`,
    requestOptions: {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    },
  });
};
