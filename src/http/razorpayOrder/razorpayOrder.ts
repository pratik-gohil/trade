import HTTP from "../http";

export const razorpayOrder = async ({
  amount,
  receipt,
  account_number,
  name,
  ifsc,
}) => {
  return await fetch(
    `${process.env.REACT_APP_FUNDAMENTAL_BASE_URL}/Razorpay/RazorpayOrder`,
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
