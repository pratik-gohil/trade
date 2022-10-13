import React from "react";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

export default function AddFundsModal({
  showModal,
  setShowModal,
  setShowFundsUPIModal,
}) {
  const addMoney = () => {
    setShowModal(false);
    setShowFundsUPIModal(true);
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
            <div className="text-3xl text-primary font-medium py-3.5 bg-blueHighlight rounded-md self-stretch text-center">
              260.00
            </div>
            <div className="text-lg text-secondary">
              Ava. Balance: <span className="text-primary">5,65,250.00</span>
            </div>
          </div>
          <div className="py-2.5 flex flex-col gap-2.5">
            <h1 className="font-light text-primary text-xl">Select Bank</h1>
            <div className="border rounded-md px-3 py-1.5">
              <h1 className="font-medium text-lg text-primary">HDFC Bank</h1>
              <span className="text-secondary">xxxxxxxxx2345</span>
            </div>
            <div className="border rounded-md px-3 py-1.5">
              <h1 className="font-medium text-lg text-primary">HDFC Bank</h1>
              <span className="text-secondary">xxxxxxxxx2345</span>
            </div>
          </div>
          <div className="py-2.5 flex flex-col gap-2.5">
            <h1 className="font-light text-primary text-xl">
              Select Payment Mode
            </h1>
            <div className="flex justify-between items-center">
              <div className="p-3 rounded-md border border-blue">UPI</div>
              <div className="p-3 rounded-md border">Net Banking</div>
              <div className="p-3 rounded-md border">Others</div>
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
