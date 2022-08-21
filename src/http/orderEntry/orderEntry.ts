import HTTP from "../http";

export const orderEntry = async (data) => {
  const response = await HTTP.post(
    `${process.env.REACT_APP_API_BASE_URL}/enterprise/orders`,
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
