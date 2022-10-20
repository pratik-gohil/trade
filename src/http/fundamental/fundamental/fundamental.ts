import HTTP from "../../http";

export const fundamental_overview = async () => {
  return await HTTP.post(
    `http://api.lkp.net.in/commonAPI_test/Fundamental/fundamental/INE009A01021`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa("SW76Q5JIAD:lkp@123")}`,
      },
    }
  );
};
