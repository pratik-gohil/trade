import React from "react";
import Modal from "@mui/material/Modal";
import {
  CancelOutlined,
  CheckCircleOutline,
  CloseOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

function AddFundsResponseModal({
  addFundsResponse,
  setAddFundsResponse,
  amount,
}) {
  return (
    <Modal open={!!addFundsResponse}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[418px] overflow-hidden">
        <div
          className="bg-neutral-gradient px-5 py-2.5 flex items-center
            w-full justify-between font-semibold text-primary text-2xl
          "
        >
          Transaction {addFundsResponse}
          <span onClick={() => setAddFundsResponse(null)}>
            <IconButton aria-label="close">
              <CloseOutlined />
            </IconButton>
          </span>
        </div>
        <div className="px-14 py-7 text-center flex flex-col justify-center items-center gap-7">
          {addFundsResponse === "success" ? (
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
            Payment of {amount} {addFundsResponse}
          </h1>

          <p className="text-sm text-primary font-light">
            {addFundsResponse === "success"
              ? "You will now be automatically redirected to Funds"
              : "If the money was debited from your bank, it will be credited back in sometime"}
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default AddFundsResponseModal;
