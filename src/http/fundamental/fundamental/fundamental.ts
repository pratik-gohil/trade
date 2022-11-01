import HTTP from "../../http";

export const fundamental_overview = async () => {
  return await HTTP.post(
    `${process.env.REACT_APP_FUNDAMENTAL_BASE_URL}/Fundamental/fundamental/INE009A01021`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa("SW76Q5JIAD:lkp@123")}`,
      },
    }
  );
};
