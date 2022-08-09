import HTTP from "../http";

export const validateUser = async (data) => {
  const response = await HTTP.post(
    "https://devtrade.lkp.net.in/enterprise/auth/validateuser",
    {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
