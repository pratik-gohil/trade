import HTTP from "../http";

export const getBulkBlockDeals = async ({ symbol = "INFY" }) => {
  return await HTTP.get({
    url: `${process.env.REACT_APP_NEWS_BASE_URL}/clientapi/lane/stock/bulk-block-deals-stock/${symbol}`,
    requestOptions: {
      headers: {
        KEY: process.env.REACT_APP_NEWS_KEY,
        userID: process.env.REACT_APP_NEWS_userID,
        password: "!36$XF2u",
        requestCode: process.env.REACT_APP_NEWS_requestCode,
      },
    },
  });
};
