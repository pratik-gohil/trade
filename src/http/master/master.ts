import HTTP from "../http";

export const getMaster = async (exchangeSegments) => {
  const response = await HTTP.post(
    `${process.env.REACT_APP_API_BASE_URL}/enterprise/instruments/master`,
    {
      body: JSON.stringify({
        exchangeSegmentList: [...exchangeSegments],
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
