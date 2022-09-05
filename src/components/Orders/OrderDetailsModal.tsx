import React from "react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import { CloseOutlined } from "@mui/icons-material";
import { Segments } from "../../types/enums/segment.enums.types";

export default function OrderDetailsModal({ showDetails, setShowDetails }) {
  return (
    <Modal
      open={!!showDetails}
      onClose={() => setShowDetails(null)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[542px] overflow-hidden">
        <div
          className="bg-neutral-gradient p-5 flex items-center
            w-full justify-between
          "
        >
          <div className="flex items-end gap-2 leading-3">
            <span className="font-semibold text-2xl text-primary">
              {showDetails?.TradingSymbol}
            </span>
            <span className="text-xs text-secondary">
              {Segments[showDetails?.ExchangeSegment]}
            </span>
            <span
              className={`${
                showDetails?.OrderSide === "BUY"
                  ? "text-success bg-successHighlight"
                  : "text-failure bg-failureHighlight"
              } text-xs rounded-[4px] py-[5px] px-[6px] font-medium`}
            >
              {showDetails?.OrderSide}
            </span>
            <span
              className={`${
                true
                  ? "text-success bg-successHighlight"
                  : "text-failure bg-failureHighlight"
              } text-xs rounded-[4px] py-[5px] px-[6px] font-medium`}
            >
              {showDetails?.OrderStatus}
            </span>
          </div>
          <div onClick={() => setShowDetails(null)}>
            <IconButton aria-label="close">
              <CloseOutlined />
            </IconButton>
          </div>
        </div>
        <div
          className="

            flex flex-col gap-2
          px-10 py-6"
        >
          <div
            className="
            flex justify-between"
          >
            <span className="text-sm text-secondary">Qty</span>
            <span className="text-lg text-primary font-medium">
              {showDetails?.OrderQuantity}
            </span>
          </div>
          <div
            className="
            flex justify-between"
          >
            <span className="text-sm text-secondary">Price</span>
            <span className="text-lg text-primary font-medium">
              {showDetails?.OrderPrice}
            </span>
          </div>
          <div
            className="
            flex justify-between"
          >
            <span className="text-sm text-secondary">Avg. Price</span>
            <span className="text-lg text-primary font-medium">
              {showDetails?.AverageTradedPrice}
            </span>
          </div>
          <div
            className="
            flex justify-between"
          >
            <span className="text-sm text-secondary">Trigger Price</span>
            <span className="text-lg text-primary font-medium">
              {showDetails?.OrderStopPrice}
            </span>
          </div>
          <div
            className="
            flex justify-between"
          >
            <span className="text-sm text-secondary">Order Type</span>
            <span className="text-lg text-primary font-medium">
              {showDetails?.OrderType}
            </span>
          </div>
          <div
            className="
            flex justify-between"
          >
            <span className="text-sm text-secondary">Product</span>
            <span className="text-lg text-primary font-medium">
              {showDetails?.ProductType}
            </span>
          </div>
          <div
            className="
            flex justify-between"
          >
            <span className="text-sm text-secondary">Validity</span>
            <span className="text-lg text-primary font-medium">
              {showDetails?.TimeInForce}
            </span>
          </div>
          <div
            className="
            flex justify-between"
          >
            <span className="text-sm text-secondary">Order ID</span>
            <span className="text-lg text-primary font-medium">
              {showDetails?.AppOrderID}
            </span>
          </div>
          <div
            className="
            flex justify-between"
          >
            <span className="text-sm text-secondary">Exchange Order ID</span>
            <span className="text-lg text-primary font-medium">
              {showDetails?.ExchangeOrderID}
            </span>
          </div>
          <div
            className="
            flex justify-between"
          >
            <span className="text-sm text-secondary">Time</span>
            <span className="text-lg text-primary font-medium">
              {showDetails?.OrderGeneratedDateTime}
            </span>
          </div>
          <div
            className="
            flex justify-between"
          >
            <span className="text-sm text-secondary">Exchange Time</span>
            <span className="text-lg text-primary font-medium">
              {showDetails?.ExchangeTransactTime}
            </span>
          </div>
          <div
            className="
            flex justify-between"
          >
            <span className="text-sm text-secondary">Placed by</span>
            <span className="text-lg text-primary font-medium">
              {showDetails?.ClientID}
            </span>
          </div>
          <div className="self-center">
            <button className="m-auto bg-blue text-white rounded-lg px-6 py-2">
              View History
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
