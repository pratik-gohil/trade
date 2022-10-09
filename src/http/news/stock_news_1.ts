import HTTP from "../http";

export const getStockNews = async ({
  symbol = "INFY",
  pageNumber = 1,
  perPageCount = 10,
}) => {
  return await HTTP.get({
    url: `${process.env.REACT_APP_NEWS_BASE_URL}/clientapi/lane/stock/newsfeed/${symbol}?pageNumber=${pageNumber}&perPageCount=${perPageCount}`,
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
