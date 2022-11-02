import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { verify_vpa } from "../../http/hdfc_upi/verify_vpa";
import { createOrder } from "../../http/hdfc_upi/createOrder";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { transactionCollectRequest } from "../../http/hdfc_upi/transactionCollectRequest";

export default function AddFundsModalUPI({ showModal, setShowModal, amount }) {
  const [VPA, setVPA] = useState("sumit039@hdfcbank");
  const [isVPAValid, setIsVPAValid] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const { ClientBankInfoList } = user;

  const addMoney = () => {
    // console.log(ClientBankInfoList[0].AccountNumber);
    createOrder({
      Client_Bank_Acno: ClientBankInfoList[0].AccountNumber,
      Amount: amount,
    })
      .then((res) => {
        // [{"COLUMNS":["IDENTITY1"],"DATA":[["Sucess :266"]]},""]
        return res[0]["DATA"][0][0].split(":")[1];
      })
      .then((order) => {
        transactionCollectRequest({
          OrderNo: order,
          Amount: amount,
          SenderUPI: VPA,
          AccountNo: ClientBankInfoList[0].AccountNumber,
        }).then((res) => {
          const data = res.data.split("|");
          alert(data[3]);
          if (data[3] === "SUCCESS") {
          }
        });
      });
  };

  const verifyVPA = () => {
    verify_vpa({ VPA }).then((res) => {
      const res_params = res.split("|");
      const status = res_params[3];
      // (VE=Available,
      // VN=Not Available,
      // F=Failed)
      if (status === "VE") {
        setIsVPAValid(true);
      }
    });
  };

  return (
    <Modal open={!!showModal} onClose={() => setShowModal(null)}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[418px] overflow-hidden">
        <div
          className="bg-neutral-gradient px-5 py-2.5 flex items-center
            w-full justify-between
          "
        >
          <span className="text-primary text-2xl font-semibold">
            UPI Payment
          </span>
          <span onClick={() => setShowModal(null)}>
            <IconButton aria-label="close">
              <CloseOutlined />
            </IconButton>
          </span>
        </div>
        <div className="px-10">
          <div className="py-2.5 flex flex-col gap-2.5">
            <h1 className="font-light text-primary text-xl">
              Select Payment Mode
            </h1>
            <div
            // className={`border rounded-md p-3 flex justify-between gap-3
            //  ${isVPAValid ? "pointer-events-none" : ""}
            // `}
            >
              <input
                // disabled={isVPAValid}
                value={VPA}
                onChange={(e) => setVPA(e.target.value)}
                className="border-none outline-none w-full bg-transparent"
              />
              <button
                type="button"
                disabled={isVPAValid}
                // onClick={verifyVPA}
                className="text-blue font-semibold text-lg cursor-pointer"
              >
                Verify
              </button>
            </div>
            <span className="text-secondary text-xs font-light">
              UPI linked to ICICI Bank A/c XXXXXXXXXX2334
            </span>
            <div className="flex justify-between items-center gap-3">
              <div className="w-full border py-2.5 my-2.5 text-2xl font-medium rounded-md self-stretch text-center cursor-pointer">
                Cancel
              </div>
              <button
                type="button"
                onClick={addMoney}
                // disabled={!isVPAValid}
                className={`w-full bg-blue text-white py-2.5 my-2.5 text-2xl font-medium rounded-md self-stretch text-center cursor-pointer ${
                  isVPAValid ? "" : "cursor-not-allowed"
                }`}
              >
                Procceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
