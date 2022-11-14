import React from "react";
import Modal from "@mui/material/Modal";
import {
  CancelOutlined,
  CheckCircleOutline,
  CloseOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

function WithdrawFundsResponseModal({
  withdrawFundsResponse,
  setWithdrawFundsResponse,
  amount,
}) {
  return (
    <Modal open={!!withdrawFundsResponse}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[418px] overflow-hidden">
        <div
          className="bg-neutral-gradient px-5 py-2.5 flex items-center
            w-full justify-between font-semibold text-primary text-2xl
          "
        >
          Withdraw Money Status
          <span onClick={() => setWithdrawFundsResponse(null)}>
            <IconButton aria-label="close">
              <CloseOutlined />
            </IconButton>
          </span>
        </div>
        <div className="px-14 py-7 text-center flex flex-col justify-center items-center gap-7">
          {withdrawFundsResponse === "success" ? (
            <CheckCircleOutline
              sx={{ fontSize: "75px" }}
              className="text-success"
            />
          ) : (
            <CancelOutlined
              sx={{ fontSize: "75px" }}
              className="text-failure"
            />
          )}

          <h1 className="font-medium text-primary text-xl">
            Withdrawal Request Received
          </h1>

          <p className="text-sm text-primary font-light">
            {withdrawFundsResponse === "success"
              ? "Your request for withdrawal has been received and requested amount will be credited based on available balance"
              : ""}
          </p>
          <div className="w-full flex justify-between items-center gap-3">
            <div className="w-full border py-2.5 my-2.5 text-2xl font-medium rounded-md self-stretch text-center cursor-pointer text-secondary">
              Cancel
            </div>
            <button
              type="button"
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

export default WithdrawFundsResponseModal;
