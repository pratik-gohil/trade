import React, { useState, useCallback, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import useRazorpay from "react-razorpay";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IClientBankInfoList } from "../../features/Auth/Auth";
import { razorpayOrder } from "../../http/razorpayOrder/razorpayOrder";
import { withdraw } from "../../http/withdraw/withdraw";

export default function WithdrawFundsModal({
  showModal,
  setShowModal,
  balanceList,
}) {
  const [account, setAccount] = useState<IClientBankInfoList | null>(null);
  const [amount, setAmount] = useState("0.00");
  const user = useSelector((state: RootState) => state.auth.user);
  const { EmailId, MobileNo, ClientBankInfoList, ClientId, ClientName } = user;

  useEffect(() => {
    setAccount(ClientBankInfoList[0]);
  }, [user]);

  const withdrawMoney = () => {
    withdraw({
      amount,
      BankAccountNumber: ClientBankInfoList[0].AccountNumber,
    }).then((res) => console.log(res));
  };

  return (
    <Modal open={!!showModal} onClose={() => setShowModal(null)}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[418px] max-h-[90%] overflow-auto">
        <div
          className="bg-neutral-gradient px-5 py-2.5 flex items-center
            w-full justify-between
          "
        >
          <span className="text-primary text-2xl font-semibold">
            Withdraw Funds
          </span>
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
            <h1 className="font-light text-primary text-sm">
              Funds will be credited in below account
            </h1>
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
          </div>
          <div className="flex flex-col gap-5 py-6 border-b">
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Closing Balance</div>
              <div className="text-xl text-primary">NA</div>
            </div>
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Unsettled Credits</div>
              <div className="text-xl text-primary">NA</div>
            </div>
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Payin</div>
              <div className="text-xl text-primary">
                {balanceList[0]?.limitObject?.marginAvailable?.PayInAmount}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Collateral Utilised</div>
              <div className="text-xl text-primary">NA</div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-3 py-6">
            <div className="w-full border py-2.5 my-2.5 text-2xl font-medium rounded-md self-stretch text-center cursor-pointer">
              Cancel
            </div>
            <button
              type="button"
              onClick={withdrawMoney}
              className={`w-full bg-blue text-white py-2.5 my-2.5 text-2xl font-medium rounded-md self-stretch text-center cursor-pointer`}
            >
              Procceed
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
