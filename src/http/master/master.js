import HTTP from "../http";

export const getMaster = async () => {
  const response = await HTTP.post(
    "https://devtrade.lkp.net.in/marketdata/instruments/master",
    {
      body: JSON.stringify({
        exchangeSegmentList: ["NSECM"],
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
