import { Replay } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import {
  orderTypeReducer,
  visiblityReducer,
} from "../../features/orderModal/orderModal";
import { NumberInput } from "../NumberInput";
import { CustomSwitch } from "../Switch";
import { RootState } from "../../app/store";
import { useTheme, Theme } from "@mui/material";

let margin = 50;

export function OrderModal() {
  const theme: Theme = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  const [vh, setVh] = useState(0);
  const [vw, setVw] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [orderType, setOrderType] = useState("Regular");
  const { type, instrument, data } = useSelector(
    (state: RootState) => state.orderModal.order
  );

  const [price, setPrice] = useState(0);
  const [triggerPrice, setTriggerPrice] = useState(0);
  const [QTY, setQTY] = useState(1);
  const [disclosedQTY, setDisclosedQTY] = useState(0);
  const isOpen = useSelector((state: RootState) => state.orderModal.visible);
  const dispatch = useDispatch();

  useEffect(() => {
    setPrice(data?.Touchline?.LastTradedPrice);
  }, [data]);

  useEffect(() => {
    let document_height = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    let document_width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );

    if (modalRef.current) {
      setVh(document_height - modalRef.current.clientHeight);
      setVw(document_width - modalRef.current.clientWidth);
    }
  }, [isOpen]);

  useEffect(() => {
    setPosition({ y: vh, x: vw / 2 });
  }, [vh, vw]);

  if (!isOpen) return null;

  return (
    instrument && (
      <>
        <Draggable
          handle=".handle"
          position={position}
          onStop={(_, data) => {
            setPosition({
              x:
                data.x <= margin
                  ? 0
                  : data.x >= vw - margin
                  ? vw
                  : data.x > 0
                  ? data.x > vw
                    ? vw
                    : data.x
                  : 0,
              y:
                data.y <= margin
                  ? 0
                  : data.y >= vh - margin
                  ? vh
                  : data.y > 0
                  ? data.y > vh
                    ? vh
                    : data.y
                  : 0,
            });
          }}
        >
          <div
            ref={modalRef}
            className="absolute top-0 bg-white rounded-lg overflow-hidden shadow"
          >
            <div
              className={`${
                type === "BUY" ? "bg-light-green-gradient" : "bg-pink-gradient"
              } flex justify-between items-center handle cursor-move px-5 py-[10px]`}
            >
              <div className="flex flex-col gap-1">
                <div className="text-md font-medium">
                  {instrument.DisplayName}
                </div>
                <div className="text-xs text-blue font-medium flex justify-center items-center gap-8">
                  <div
                    className="
                flex justify-center items-center gap-2"
                  >
                    <input
                      name="radio-order-modal-exchange"
                      id="radio-order-modal-exchange-nse"
                      type="radio"
                    />
                    <label htmlFor="radio-order-modal-exchange-nse">
                      NSE - 480
                    </label>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <input
                      name="radio-order-modal-exchange"
                      id="radio-order-modal-exchange-bse"
                      type="radio"
                    />
                    <label htmlFor="radio-order-modal-exchange-bse">
                      BSE - 480
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className={`${
                    type === "BUY" ? "bg-success" : "bg-failure"
                  } w-11 h-7 text-xs rounded-md font-medium text-white`}
                >
                  {type === "BUY" ? "Buy" : "Sell"}
                </button>
                <CustomSwitch
                  color={
                    type === "BUY"
                      ? theme.palette.success.main
                      : theme.palette.failure.main
                  }
                  onChange={(e) => {
                    dispatch(
                      orderTypeReducer(e.target.checked ? "SELL" : "BUY")
                    );
                  }}
                  checked={type === "SELL"}
                />
              </div>
            </div>
            <div className="flex items-center gap-14 border-b-2 border-border text-sm font-medium px-5 pt-2 pb-1">
              <div
                onClick={() => setOrderType("Regular")}
                className={`${
                  orderType === "Regular"
                    ? "text-blue underline underline-offset-[8px] decoration-2"
                    : ""
                } cursor-pointer`}
              >
                Regular
              </div>
              <div
                onClick={() => setOrderType("Cover")}
                className={`${
                  orderType === "Cover"
                    ? "text-blue underline underline-offset-[8px] decoration-2"
                    : ""
                } cursor-pointer`}
              >
                Cover
              </div>
              <div
                onClick={() => setOrderType("AMO")}
                className={`${
                  orderType === "AMO"
                    ? "text-blue underline underline-offset-[8px] decoration-2"
                    : ""
                } cursor-pointer`}
              >
                AMO
              </div>
            </div>
            <div className="px-5 py-[10px] flex flex-col gap-4 border-b-2 border-border">
              <div className="text-xs text-primary font-medium flex items-center gap-8">
                <div
                  className="
                flex justify-center items-center gap-2"
                >
                  <input
                    name="radio-order-modal-trade-type"
                    id="radio-order-modal-trade-type-intraday"
                    type="radio"
                  />
                  <label htmlFor="radio-order-modal-trade-type-intraday">
                    Trade Intraday
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    name="radio-order-modal-trade-type"
                    id="radio-order-modal-trade-type-longterm"
                    type="radio"
                  />
                  <label
                    htmlFor="radio-order-modal-trade-type-longterm"
                    className=""
                  >
                    Delivery Longterm
                  </label>
                </div>
              </div>
              <div className="flex justify-between items-center gap-8">
                <NumberInput
                  label="QTY"
                  value={QTY}
                  onChange={(value) => setQTY(value)}
                />
                <NumberInput
                  label="Price"
                  value={price}
                  onChange={(value) => setPrice(value)}
                />
                <NumberInput
                  disabled
                  label="Trigger price"
                  value={triggerPrice}
                  onChange={(value) => setTriggerPrice(value)}
                />
              </div>
              <div className="text-xs text-primary font-medium flex items-center gap-8">
                <div
                  className="
                flex justify-center items-center gap-2"
                >
                  <input
                    name="radio-order-modal-trade-sub-type"
                    id="radio-order-modal-trade-sub-type-market"
                    type="radio"
                  />
                  <label htmlFor="radio-order-modal-trade-sub-type-market">
                    Market
                  </label>
                </div>
                <div
                  className="
                flex justify-center items-center gap-2"
                >
                  <input
                    name="radio-order-modal-trade-sub-type"
                    id="radio-order-modal-trade-sub-type-limit"
                    type="radio"
                  />
                  <label htmlFor="radio-order-modal-trade-sub-type-limit">
                    Limit
                  </label>
                </div>
                <div
                  className="
                flex justify-center items-center gap-2"
                >
                  <input
                    name="radio-order-modal-trade-sub-type"
                    id="radio-order-modal-trade-sub-type-sl"
                    type="radio"
                  />
                  <label htmlFor="radio-order-modal-trade-sub-type-sl">
                    SL
                  </label>
                </div>
                <div
                  className="
                flex justify-center items-center gap-2"
                >
                  <input
                    name="radio-order-modal-trade-sub-type"
                    id="radio-order-modal-trade-sub-type-sl-m"
                    type="radio"
                  />
                  <label htmlFor="radio-order-modal-trade-sub-type-sl-m">
                    SL-M
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-8 px-5 py-[10px] border-b-2 border-border">
              <div className="flex flex-col ">
                <div className="text-sm">Validity</div>
                <div className="text-xs text-primary font-medium flex items-center gap-8">
                  <div
                    className="
                flex justify-center items-center gap-2"
                  >
                    <input
                      name="radio-order-modal-validity"
                      id="radio-order-modal-validity-day"
                      type="radio"
                    />
                    <label htmlFor="radio-order-modal-validity-day">Day</label>
                  </div>
                  <div
                    className="
                flex justify-center items-center gap-2"
                  >
                    <input
                      name="radio-order-modal-validity"
                      id="radio-order-modal-validity-intermidiate"
                      type="radio"
                    />
                    <label htmlFor="radio-order-modal-validity-intermidiate">
                      Immediate
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <NumberInput
                  label="Disclosed QTY."
                  value={disclosedQTY}
                  onChange={(value) => setDisclosedQTY(value)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center px-5 py-[10px]">
              <div className="flex flex-col text-xs text-neutral">
                <div className="flex gap-6">
                  <div>Approx. Margin</div>
                  <div className="flex gap-2 translate-x-[32px]">
                    <div>280.00</div>
                    <Replay className="text-blue cursor-pointer" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Available</div>
                  <div>280.00</div>
                </div>
              </div>
              <div className="flex gap-6">
                <button
                  className={`${
                    type === "BUY" ? "bg-green-gradient" : "bg-red-gradient"
                  } w-[105px] h-[45px] rounded-lg font-medium text-white`}
                >
                  {type === "BUY" ? "Buy" : "Sell"}
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      visiblityReducer({
                        visible: false,
                        order: {},
                      })
                    )
                  }
                  className="bg-white w-[105px] h-[45px] rounded-lg font-medium text-neutral border-2 border-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Draggable>
      </>
    )
  );
}
