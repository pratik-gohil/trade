import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { verify_vpa } from "../../http/hdfc_upi/verify_vpa";

export default function AddFundsModalUPI({ showModal, setShowModal }) {
  const [VPA, setVPA] = useState("");
  const addMoney = () => {
    setShowModal(false);
  };

  const verifyVPA = () => {
    verify_vpa({ VPA }).then(console.log);
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
            <div className="border rounded-md p-3 flex justify-between gap-3">
              <input
                onChange={(e) => setVPA(e.target.value)}
                className="border-none outline-none w-full"
              />
              <span
                onClick={verifyVPA}
                className="text-blue font-semibold text-lg cursor-pointer"
              >
                Verify
              </span>
            </div>
            <span className="text-secondary text-xs font-light">
              UPI linked to ICICI Bank A/c XXXXXXXXXX2334
            </span>
            <div className="flex justify-between items-center gap-3">
              <div className="w-full border py-2.5 my-2.5 text-2xl font-medium rounded-md self-stretch text-center cursor-pointer">
                Cancel
              </div>
              <div
                onClick={addMoney}
                className="w-full bg-blue text-white py-2.5 my-2.5 text-2xl font-medium rounded-md self-stretch text-center cursor-pointer"
              >
                Procceed
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
