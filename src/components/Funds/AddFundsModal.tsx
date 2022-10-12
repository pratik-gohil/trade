import React from "react";
import Modal from "@mui/material/Modal";

export default function AddFundsModal({ showModal, setShowModal }) {
  return (
    <Modal open={!!showModal} onClose={() => setShowModal(null)}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[418px] overflow-hidden">
        <div
          className="bg-neutral-gradient p-5 flex items-center
            w-full justify-between
          "
        >
          <span className="text-primary text-2xl font-semibold">Add Funds</span>
          <span onClick={() => setShowModal(null)}>x</span>
        </div>
        <div className="p-10">
          <div className="flex flex-col items-center gap-2.5 border-b">
            <div className="text-lg text-secondary">Amount</div>
            <div className="text-3xl text-primary font-medium py-3.5 bg-blueHighlight rounded-md self-stretch text-center">
              260.00
            </div>
            <div className="text-lg text-secondary">
              Ava. Balance: <span className="text-primary">5,65,250.00</span>
            </div>
          </div>
          <div className="bg-blue text-white py-2.5 text-2xl font-medium rounded-md self-stretch text-center mt-[22px]">
            Add Money To Account
          </div>
        </div>
      </div>
    </Modal>
  );
}
