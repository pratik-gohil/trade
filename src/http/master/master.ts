import HTTP from "../http";

export const getMaster = async (exchangeSegments: string[]) => {
  const response = await HTTP.post(
    `http://api.lkp.net.in/CommonAPI_Test/ScripMaster/ScripMaster`,
    {
      body: JSON.stringify({
        exchangeSegmentList: exchangeSegments,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("SW76Q5JIAD:lkp@123")}`,
      },
    }
  );
  return response;
};
