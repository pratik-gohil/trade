import HTTP from "../http";

export const getUserProfile = async () => {
  return await HTTP.get({
    url: `https://devtrade.lkp.net.in/enterprise/user/profile?clientID=${localStorage.getItem(
      "userID"
    )}&userID=${localStorage.getItem("userID")}`,
    requestOptions: {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    },
  });
  // return await fetch(
  //   `https://devtrade.lkp.net.in/enterprise/user/profile?clientID=${localStorage.getItem(
  //     "userID"
  //   )}&userID=${localStorage.getItem("userID")}`,
  //   {
  // headers: {
  //   Authorization: localStorage.getItem("token") || "",
  // },
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((data) => data)
  //   .catch((err) => err);
};
