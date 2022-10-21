import HTTP from "../http";

export const razorpayOrder = async ({
  amount,
  receipt,
  account_number,
  name,
  ifsc,
}) => {
  return await fetch(
    "http://api.lkp.net.in/CommonAPI_Test/Razorpay/RazorpayOrder",
    {
      method: "POST",
      body: JSON.stringify({
        amount: Number(amount),
        method: "netbanking",
        receipt,
        currency: "INR",
        bankdetails: {
          account_number,
          name,
          ifsc,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("SW76Q5JIAD:lkp@123")}`,
      },
    }
  )
    .then((res) => res.text())
    .then((data) => JSON.parse(data));
};
