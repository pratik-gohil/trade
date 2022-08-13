import HTTP from "../http";

export const getMaster = async () => {
  const response = await HTTP.post(
    `${process.env.REACT_APP_API_BASE_URL}/marketdata/instruments/master`,
    {
      body: JSON.stringify({
        exchangeSegmentList: ["NSECM", "BSECM", "NSEFO", "NSECD"],
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
