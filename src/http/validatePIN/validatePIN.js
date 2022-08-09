import HTTP from "../http";

export const validatePIN = async (data) => {
  const response = await HTTP.post(
    "https://devtrade.lkp.net.in/enterprise/auth/validatepin",
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
