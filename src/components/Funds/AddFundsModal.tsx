import React, { useState, useCallback, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import useRazorpay from "react-razorpay";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { constants } from "../../constants/global";
import { IClientBankInfoList } from "../../features/Auth/Auth";
const { CLIENT_ID, TOKEN, USER_ID } = constants;

export default function AddFundsModal({
  amount: amount_prop,
  showModal,
  setShowModal,
  setShowFundsUPIModal,
}) {
  const Razorpay = useRazorpay();
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [account, setAccount] = useState<IClientBankInfoList | null>(null);
  const [amount, setAmount] = useState("");
  const { EmailId, MobileNo, ClientBankInfoList, userID, ClientId } =
    useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setAccount(ClientBankInfoList[0]);
    setAmount(amount_prop);
  }, []);

  const addMoneyUPI = () => {
    setShowModal(false);
    setShowFundsUPIModal(true);
  };

  console.log(amount, account, userID, ClientId);

  const addMoneyNetBanking = useCallback(() => {
    fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic  + ${btoa(
          "rzp_test_NIhIkG4rH4XsHh:A4tZcSRH3yjdPbgAHxZNQ4jV"
        )}`,
      },
      body: `{"amount": ${amount},"currency": "INR", "method": "netbanking" , "bank_account" : {"account_number": "${account?.AccountNumber}","name": "Nirav Mehta","ifsc": "${account?.BankIFSCCode}"},"notes" : {"userID": "${USER_ID}","clientID": "${CLIENT_ID}","address": "","paymentSource": "TradeApp","ifsc_code": "${account?.BankIFSCCode}","acc_num": "${account?.AccountNumber}"}}`,
    })
      .then((res) => res.json())
      .then((data) => {
        const options = {
          key: "rzp_test_NIhIkG4rH4XsHh",
          amount: (Number(amount) * 100).toString(),
          currency: "INR",
          name: "LKP",
          description: "Add Funds",
          // image: "https://example.com/your_logo",
          order_id: "order_KV97gky3EDASDX",
          handler: function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
          },
          prefill: {
            email: EmailId,
            contact: MobileNo,
          },
        };
        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        setShowModal(false);
        rzp1.open();
      });
  }, [Razorpay]);

  const addMoney = () => {
    switch (paymentMode) {
      case "UPI":
        addMoneyUPI();
        break;
      case "Net Banking":
        addMoneyNetBanking();
        break;
    }
  };
  return (
    <Modal open={!!showModal} onClose={() => setShowModal(null)}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[418px] overflow-hidden">
        <div
          className="bg-neutral-gradient px-5 py-2.5 flex items-center
            w-full justify-between
          "
        >
          <span className="text-primary text-2xl font-semibold">Add Funds</span>
          <span onClick={() => setShowModal(null)}>
            <IconButton aria-label="close">
              <CloseOutlined />
            </IconButton>
          </span>
        </div>
        <div className="px-10">
          <div className="flex flex-col items-center gap-2.5 border-b py-2.5">
            <div className="text-lg text-secondary">Amount</div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-3xl text-primary font-medium py-3.5 bg-blueHighlight rounded-md self-stretch text-center"
            />
            <div className="text-lg text-secondary">
              Ava. Balance: <span className="text-primary">5,65,250.00</span>
            </div>
          </div>
          <div className="py-2.5 flex flex-col gap-2.5">
            <h1 className="font-light text-primary text-xl">Select Bank</h1>
            {ClientBankInfoList.map((bank) => (
              <div
                key={bank.AccountNumber}
                className={`border rounded-md px-3 py-1.5 ${
                  account?.AccountNumber == bank.AccountNumber
                    ? "border-blue"
                    : ""
                }`}
              >
                <h1 className="font-medium text-lg text-primary">
                  {bank.BankName}
                </h1>
                <span className="text-secondary text-xxs">
                  {"x".repeat(bank.AccountNumber.length - 4) +
                    bank.AccountNumber.slice(-4, bank.AccountNumber.length)}
                </span>
              </div>
            ))}
            {/* <div className="border rounded-md px-3 py-1.5">
              <h1 className="font-medium text-lg text-primary">HDFC Bank</h1>
              <span className="text-secondary">xxxxxxxxx2345</span>
            </div>
            <div className="border rounded-md px-3 py-1.5">
              <h1 className="font-medium text-lg text-primary">HDFC Bank</h1>
              <span className="text-secondary">xxxxxxxxx2345</span>
            </div> */}
          </div>
          <div className="py-2.5 flex flex-col gap-2.5">
            <h1 className="font-light text-primary text-xl">
              Select Payment Mode
            </h1>
            <div className="flex justify-between items-center">
              <div
                className={`cursor-pointer p-3 rounded-md border ${
                  paymentMode === "UPI" ? "border-blue" : ""
                }`}
                onClick={() => setPaymentMode("UPI")}
              >
                UPI
              </div>
              <div
                className={`cursor-pointer p-3 rounded-md border ${
                  paymentMode === "Net Banking" ? "border-blue" : ""
                }`}
                onClick={() => setPaymentMode("Net Banking")}
              >
                Net Banking
              </div>
              <div
                className={`cursor-pointer p-3 rounded-md border ${
                  paymentMode === "Others" ? "border-blue" : ""
                }`}
                onClick={() => setPaymentMode("Others")}
              >
                Others
              </div>
            </div>
            <div
              onClick={addMoney}
              className="bg-blue text-white py-2.5 my-2.5 text-2xl font-medium rounded-md self-stretch text-center cursor-pointer"
            >
              Add Money To Account
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
