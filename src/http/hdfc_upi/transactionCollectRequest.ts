import HTTP from "../http";

export const transactionCollectRequest = async ({
  OrderNo,
  Amount,
  SenderUPI,
  MerchantId = "HDFC000000000828",
  AccountNo,
}) => {
  return await HTTP.post(
    `http://api.lkp.net.in/CommonAPI_Test/UPI/CreateOrder`,
    {
      method: "POST",
      body: JSON.stringify({
        OrderNo,
        Amount,
        SenderUPI,
        MerchantId,
        AccountNo,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("SW76Q5JIAD:lkp@123")}`,
      },
    }
  );
};
