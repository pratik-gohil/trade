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
import {
  useTheme,
  Theme,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import CustomRadio from "../Radio/Radio";

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
  const [Qty, setQTY] = useState(1);
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
            className="absolute top-0 bg-white text-[#8c8c8c] rounded-[10px] overflow-hidden shadow-modal"
          >
            <div
              className={`${
                type === "BUY" ? "bg-light-green-gradient" : "bg-pink-gradient"
              } flex justify-between items-center handle cursor-move px-5 py-[10px]`}
            >
              <div className="flex flex-col gap-1">
                <div className="text-md font-medium text-[#333]">
                  {instrument.DisplayName}
                </div>
                <RadioGroup
                  sx={{ display: "flex", flexDirection: "row", gap: 2 }}
                  aria-labelledby="radio-order-modal-exchange"
                  name="radio-order-modal-exchange"
                  defaultValue="NSE"
                >
                  <FormControlLabel
                    sx={{
                      fontSize: "12px",
                      margin: 0,
                      display: "flex",
                      gap: 0.5,
                    }}
                    control={<CustomRadio />}
                    value="NSE"
                    label={
                      <span className="text-xs font-medium block">
                        NSE - {data?.Touchline?.LastTradedPrice}
                      </span>
                    }
                  />
                  <FormControlLabel
                    sx={{
                      fontSize: "12px",
                      margin: 0,
                      display: "flex",
                      gap: 0.5,
                    }}
                    control={<CustomRadio />}
                    value="BSE"
                    label={
                      <span className="text-xs font-medium block">
                        BSE - {data?.Touchline?.LastTradedPrice}
                      </span>
                    }
                  />
                </RadioGroup>
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
            <div className="flex items-center gap-14 border-b-2 border-border text-sm font-medium px-5 pt-2.5 pb-1 bg-[#f9f9f9]">
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
              <RadioGroup
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
                aria-labelledby="radio-order-modal-trade-type"
                name="radio-order-modal-trade-type"
                defaultValue="intraday"
              >
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",

                    justifyContent: "center",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                  control={<CustomRadio />}
                  value="intraday"
                  label={
                    <span className="text-xs font-medium block">
                      Trade Intraday
                    </span>
                  }
                />
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",
                    gap: 0.5,
                  }}
                  control={<CustomRadio />}
                  value="longterm"
                  label={
                    <span className="text-xs font-medium block">
                      Delivery Longterm
                    </span>
                  }
                />
              </RadioGroup>
              <div className="flex justify-between items-center gap-8">
                <NumberInput
                  label="Qty"
                  value={Qty}
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
              <RadioGroup
                sx={{ display: "flex", flexDirection: "row", gap: 4 }}
                aria-labelledby="radio-order-modal-trade-sub-type"
                name="radio-order-modal-trade-sub-type"
                defaultValue="limit"
              >
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",
                    gap: 0.5,
                  }}
                  control={<CustomRadio />}
                  value="market"
                  label={
                    <span className="text-xs font-medium block">Market</span>
                  }
                />
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",
                    gap: 0.5,
                  }}
                  control={<CustomRadio />}
                  value="limit"
                  label={
                    <span className="text-xs font-medium block">Limit</span>
                  }
                />
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",
                    gap: 0.5,
                  }}
                  control={<CustomRadio />}
                  value="sl"
                  label={<span className="text-xs font-medium block">SL</span>}
                />
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",
                    gap: 0.5,
                  }}
                  control={<CustomRadio />}
                  value="sl-m"
                  label={
                    <span className="text-xs font-medium block">SL-M</span>
                  }
                />
              </RadioGroup>
            </div>
            <div className="flex gap-8 px-5 py-[10px] border-b-2 border-border">
              <div className="flex flex-col justify-between">
                <div className="text-sm">Validity</div>
                <RadioGroup
                  sx={{ display: "flex", flexDirection: "row", gap: 4 }}
                  aria-labelledby="radio-order-modal-validity"
                  name="radio-order-modal-validity"
                  defaultValue="day"
                >
                  <FormControlLabel
                    sx={{
                      fontSize: "12px",
                      margin: 0,
                      display: "flex",
                      gap: 0.5,
                    }}
                    control={<CustomRadio />}
                    value="day"
                    label={
                      <span className="text-xs font-medium block">Day</span>
                    }
                  />
                  <FormControlLabel
                    sx={{
                      fontSize: "12px",
                      margin: 0,
                      display: "flex",
                      gap: 0.5,
                    }}
                    control={<CustomRadio />}
                    value="immediate"
                    label={
                      <span className="text-xs font-medium block">
                        Immediate
                      </span>
                    }
                  />
                </RadioGroup>
              </div>
              <div className="mt-auto">
                <NumberInput
                  label="Disclosed QTY."
                  value={disclosedQTY}
                  onChange={(value) => setDisclosedQTY(value)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center px-5 py-[10px] bg-[#f9f9f9] font-medium">
              <div className="flex flex-col text-xs">
                <div className="flex gap-6">
                  <div>Approx. Margin</div>
                  <div className="flex gap-2 translate-x-[29px]">
                    <div>
                      {(data?.Touchline?.LastTradedPrice * Qty).toFixed(2)}
                    </div>
                    <Replay
                      className="text-blue cursor-pointer"
                      fontSize="small"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Available</div>
                  <div>NA</div>
                </div>
              </div>
              <div className="flex gap-6">
                <button
                  className={`${
                    type === "BUY" ? "bg-green-gradient" : "bg-red-gradient"
                  } w-[105px] h-[45px] rounded-lg text-3xl font-medium text-white`}
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
                  className="bg-white w-[105px] h-[45px] rounded-lg font-medium border-2 border-[#a9a9a9] text-[#a9a9a9] text-3xl"
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
