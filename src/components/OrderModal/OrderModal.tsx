import { ExpandLess, ExpandMore, Replay } from "@mui/icons-material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import {
  orderSideReducer,
  visiblityReducer,
} from "../../features/orderModal/orderModal";
import { NumberInput } from "../NumberInput";
import { CustomSwitch } from "../Switch";
import { RootState } from "../../app/store";
import { useTheme, Theme, FormControlLabel, RadioGroup } from "@mui/material";
import CustomRadio from "../Radio/Radio";
import { orderEntry } from "../../http/orderEntry/orderEntry";
import { constants } from "../../constants/global";
import { getUserBalance } from "../../http/userBalance/userBalance";
import { IOrderWithMarketDepth } from "../Orders";
import { IInstrument } from "../../types/interfaces/instrument.interfaces.types";
import { Segments } from "../../types/enums/segment.enums.types";
import { modifyOrder } from "../../http/modifyOrder/modifyOrder";
import { toFixedN } from "../../utils/toFixedN";
const { USER_ID, CLIENT_ID } = constants;

let margin = 50;

export function OrderModal() {
  const theme: Theme = useTheme();
  const modalRef = useRef<HTMLFormElement>(null);
  const [vh, setVh] = useState(0);
  const [vw, setVw] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [exchangeSegment, setExchangeSegment] = useState("NSECM");
  const [timeInForce, setTimeInForce] = useState("DAY");
  const [order, setOrder] = useState("NORMAL");
  const [orderType, setOrderType] = useState("MARKET");
  const { orderSide, instrument, isModify } = useSelector(
    (state: RootState) => state.orderModal.order
  );
  const [tradeType, setTradeType] = useState("INTRADAY");
  const [price, setPrice] = useState(0);
  const [triggerPrice, setTriggerPrice] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [disclosedQuantity, setDisclosedQuantity] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [userBalanceList, setUserBalanceList] = useState<any>([]);
  const isOpen = useSelector((state: RootState) => state.orderModal.visible);
  const dispatch = useDispatch();

  const isCM =
    Segments[(instrument as IInstrument)?.ExchangeSegment] === "NSECM" ||
    Segments[(instrument as IInstrument)?.ExchangeSegment] === "BSECM";
  const exchangeInstrumentID =
    (Segments[(instrument as IInstrument)?.ExchangeSegment] === "NSECM" &&
      exchangeSegment === "NSECM") ||
    (Segments[(instrument as IInstrument)?.ExchangeSegment] === "BSECM" &&
      exchangeSegment === "BSECM")
      ? (instrument as IInstrument)?.ExchangeInstrumentID
      : (instrument as IInstrument)?.OppositeExchangeInstrumentID;

  const intitialPrice =
    (isModify
      ? (instrument as IOrderWithMarketDepth)?.OrderPrice
      : (instrument as IInstrument)?.Touchline?.LastTradedPrice) || 0;

  useEffect(() => {
    if (isModify) {
      setOrderQuantity((instrument as IOrderWithMarketDepth).OrderQuantity);
      setTriggerPrice((instrument as IOrderWithMarketDepth).OrderStopPrice);
      setDisclosedQuantity(
        (instrument as IOrderWithMarketDepth).OrderDisclosedQuantity
      );
      setOrderType(
        (instrument as IOrderWithMarketDepth).OrderType.toUpperCase()
      );
      setTimeInForce((instrument as IOrderWithMarketDepth).TimeInForce);
      setPrice((instrument as IOrderWithMarketDepth).OrderPrice);
      setExchangeSegment(
        Segments[(instrument as IOrderWithMarketDepth).ExchangeSegment]
      );
      setTradeType(
        (instrument as IOrderWithMarketDepth).ProductType === "MIS"
          ? "INTRADAY"
          : "LONGTERM"
      );
    } else {
      setExchangeSegment(
        Segments[(instrument as IInstrument)?.ExchangeSegment]
      );
      setOrderQuantity((instrument as IInstrument)?.LotSize);
      setPrice(intitialPrice || 0);
    }

    getUserBalance().then((res) => {
      res.type === "success" && setUserBalanceList(res.result);
    });
  }, [instrument]);

  useLayoutEffect(() => {
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
  }, [isOpen, modalRef?.current?.clientHeight, modalRef?.current?.clientWidth]);

  useLayoutEffect(() => {
    setPosition({ y: vh, x: vw / 2 });
  }, [vh, vw]);

  const handleFormReset = () => {};

  console.log(instrument);

  const handleOrder = async (e) => {
    e.preventDefault();
    let response;
    if (price > (instrument as IInstrument)?.PriceBand.High) {
      alert(
        `order price should be less than or equal to upper circuit (${
          (instrument as IInstrument)?.PriceBand.High
        })`
      );
      return;
    }
    if (price < (instrument as IInstrument)?.PriceBand.Low) {
      alert(
        `order price should be greater than or equal to lower circuit (${
          (instrument as IInstrument)?.PriceBand.Low
        })`
      );
      return;
    }
    if (orderQuantity > (instrument as IInstrument)?.FreezeQty) {
      alert(
        `Order quantity should be less than Freeze Quantity (${
          (instrument as IInstrument)?.FreezeQty
        })`
      );
      return;
    }
    // if (price % (instrument as IInstrument)?.TickSize !== 0) {
    //   alert(`Order Price not according to tick size`);
    //   return;
    // }
    if (orderQuantity % (instrument as IInstrument)?.LotSize !== 0) {
      alert(`Order Quantity should be less than lot size`);
      return;
    }

    if (isModify) {
      response = await modifyOrder({
        appOrderID: (instrument as IOrderWithMarketDepth).AppOrderID,
        modifiedProductType:
          tradeType === "INTRADAY"
            ? "MIS"
            : exchangeSegment === "NSECM" || exchangeSegment === "BSECM"
            ? "CNC"
            : "NRML",
        modifiedOrderType: orderType,
        modifiedOrderQuantity: orderQuantity,
        modifiedDisclosedQuantity: disclosedQuantity,
        modifiedLimitPrice: price,
        modifiedStopPrice: triggerPrice,
        modifiedTimeInForce: timeInForce,
        clientID: localStorage.getItem(CLIENT_ID),
        userID: localStorage.getItem(USER_ID),
      });
    } else {
      const isCover = order === "COVER";
      const data = isCover
        ? {
            exchangeSegment: isCM
              ? exchangeSegment
              : Segments[(instrument as IInstrument)?.ExchangeSegment],
            exchangeInstrumentID: isCM
              ? exchangeInstrumentID
              : (instrument as IInstrument)?.ExchangeInstrumentID,
            orderSide,
            orderType,
            orderQuantity,
            disclosedQuantity,
            limitPrice: price,
            stopPrice:
              orderType === "MARKET" || orderType === "StopMarket"
                ? 0.0
                : triggerPrice,
            // "orderUniqueIdentifier":"XYZ1",
            clientID: localStorage.getItem(CLIENT_ID),
            userID: localStorage.getItem(USER_ID),
          }
        : {
            clientID: localStorage.getItem(CLIENT_ID),
            userID: localStorage.getItem(USER_ID),
            exchangeSegment: isCM
              ? exchangeSegment
              : Segments[(instrument as IInstrument)?.ExchangeSegment],
            exchangeInstrumentID: isCM
              ? exchangeInstrumentID
              : (instrument as IInstrument)?.ExchangeInstrumentID,
            productType:
              tradeType === "INTRADAY"
                ? "MIS"
                : exchangeSegment === "NSECM" || exchangeSegment === "BSECM"
                ? "CNC"
                : "NRML",
            orderType,
            orderSide,
            timeInForce,
            disclosedQuantity,
            orderQuantity,
            limitPrice: price,
            stopPrice:
              orderType === "MARKET" || orderType === "StopMarket"
                ? 0.0
                : triggerPrice,
            isAMO: order === "AMO",
          };
      response = await orderEntry({
        data,
        isCover,
      });
    }

    if (response.type === "success") {
      dispatch(
        visiblityReducer({
          visible: false,
          order: {},
        })
      );
    }
    alert(response.description);
  };

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
          <form
            onSubmit={handleOrder}
            ref={modalRef}
            className="z-50 absolute top-0 bg-white text-[#8c8c8c] rounded-[10px] overflow-hidden shadow-modal"
          >
            <div
              className={`${
                orderSide === "BUY"
                  ? "bg-light-green-gradient"
                  : "bg-pink-gradient"
              } flex justify-between items-center handle cursor-move px-5 py-[10px]`}
            >
              <div className="flex flex-col gap-1">
                <div className="text-md font-medium text-[#333]">
                  {isModify
                    ? (instrument as IOrderWithMarketDepth).TradingSymbol
                    : (instrument as IInstrument).DisplayName}
                </div>
                {isCM && (
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
                      control={
                        <CustomRadio
                          checked={exchangeSegment === "NSECM"}
                          onChange={() => setExchangeSegment("NSECM")}
                        />
                      }
                      value="NSE"
                      label={
                        <span className="text-xs font-medium block">
                          NSE - {intitialPrice}
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
                      control={
                        <CustomRadio
                          checked={exchangeSegment === "BSECM"}
                          onChange={() => setExchangeSegment("BSECM")}
                        />
                      }
                      value="BSE"
                      label={
                        <span className="text-xs font-medium block">
                          BSE - {intitialPrice}
                        </span>
                      }
                    />
                  </RadioGroup>
                )}
              </div>
              <div>
                <button
                  type="button"
                  className={`${
                    orderSide === "BUY" ? "bg-success" : "bg-failure"
                  } w-11 h-7 text-xs rounded-md font-medium text-white`}
                >
                  {orderSide === "BUY" ? "Buy" : "Sell"}
                </button>
                <CustomSwitch
                  color={
                    orderSide === "BUY"
                      ? theme.palette.success.main
                      : theme.palette.failure.main
                  }
                  onChange={(e) => {
                    dispatch(
                      orderSideReducer(e.target.checked ? "SELL" : "BUY")
                    );
                  }}
                  checked={orderSide === "SELL"}
                />
              </div>
            </div>
            <div className="flex items-center gap-14 border-b-2 border-border text-sm font-medium px-5 pt-2.5 pb-1 bg-[#f9f9f9]">
              <div
                onClick={() => setOrder("NORMAL")}
                className={`${
                  order === "NORMAL"
                    ? "text-blue underline underline-offset-[8px] decoration-2"
                    : ""
                } cursor-pointer`}
              >
                Normal
              </div>
              <div
                onClick={() => setOrder("COVER")}
                className={`${
                  order === "COVER"
                    ? "text-blue underline underline-offset-[8px] decoration-2"
                    : ""
                } cursor-pointer`}
              >
                Cover
              </div>
              <div
                onClick={() => setOrder("AMO")}
                className={`${
                  order === "AMO"
                    ? "text-blue underline underline-offset-[9px] decoration-2"
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
                  control={
                    <CustomRadio
                      checked={tradeType === "INTRADAY"}
                      onChange={() => setTradeType("INTRADAY")}
                    />
                  }
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
                  control={
                    <CustomRadio
                      checked={tradeType === "LONGTERM"}
                      onChange={() => setTradeType("LONGTERM")}
                    />
                  }
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
                  autoFocus
                  label="Qty"
                  required
                  step={
                    (instrument as IInstrument)?.LotSize ||
                    (instrument as IOrderWithMarketDepth)?.OrderQuantity
                  }
                  value={orderQuantity}
                  onChange={(value) => setOrderQuantity(value)}
                />
                <NumberInput
                  label="Price"
                  // value={orderType === "MARKET" ? 0 : price}
                  required
                  value={price}
                  onChange={(value) => setPrice(value)}
                  step={0.05}
                  disabled={
                    orderType === "MARKET" || orderType === "StopMarket"
                  }

                  // min={0.01}
                />
                <NumberInput
                  label="Trigger price"
                  // value={
                  //   orderType === "MARKET" || orderType === "StopMarket"
                  //     ? 0
                  //     : triggerPrice
                  // }
                  value={triggerPrice}
                  onChange={(value) => setTriggerPrice(value)}
                  step={0.05}
                  disabled={orderType === "MARKET" || orderType === "LIMIT"}
                  // min={0.01}
                />
              </div>
              <div className="flex justify-between">
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
                    control={
                      <CustomRadio
                        checked={orderType === "MARKET"}
                        onChange={() => setOrderType("MARKET")}
                      />
                    }
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
                    control={
                      <CustomRadio
                        checked={orderType === "LIMIT"}
                        onChange={() => setOrderType("LIMIT")}
                      />
                    }
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
                    control={
                      <CustomRadio
                        checked={orderType === "StopLimit"}
                        onChange={() => setOrderType("StopLimit")}
                      />
                    }
                    value="StopLimit"
                    label={
                      <span className="text-xs font-medium block">SL</span>
                    }
                  />
                  <FormControlLabel
                    sx={{
                      fontSize: "12px",
                      margin: 0,
                      display: "flex",
                      gap: 0.5,
                    }}
                    control={
                      <CustomRadio
                        checked={orderType === "StopMarket"}
                        onChange={() => setOrderType("StopMarket")}
                      />
                    }
                    value="StopMarket"
                    label={
                      <span className="text-xs font-medium block">SL-M</span>
                    }
                  />
                </RadioGroup>
                <div
                  className="text-xl text-blue font-medium cursor-pointer"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? (
                    <>
                      Hide Options <ExpandLess />
                    </>
                  ) : (
                    <>
                      More Options <ExpandMore />
                    </>
                  )}
                </div>
              </div>
            </div>
            {showMore && (
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
                      control={
                        <CustomRadio
                          checked={timeInForce === "DAY"}
                          onChange={() => setTimeInForce("DAY")}
                        />
                      }
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
                      control={
                        <CustomRadio
                          checked={timeInForce === "IOC"}
                          onChange={() => setTimeInForce("IOC")}
                        />
                      }
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
                    value={disclosedQuantity}
                    onChange={(value) => setDisclosedQuantity(value)}
                    min={0}
                    max={orderQuantity}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center px-5 py-[10px] bg-[#f9f9f9] font-medium">
              <div className="flex flex-col text-xs">
                <div className="flex gap-6">
                  <div>Approx. Margin</div>
                  <div className="flex gap-2 translate-x-[29px]">
                    <div>{toFixedN(intitialPrice * orderQuantity, 2)}</div>
                    <Replay
                      className="text-blue cursor-pointer"
                      fontSize="small"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Available</div>
                  <div>
                    {userBalanceList?.BalanceList[0] &&
                      userBalanceList?.BalanceList[0]?.limitObject?.RMSSubLimits
                        ?.netMarginAvailable}
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <button
                  type="submit"
                  // onClick={() => handleOrder(instrument)}
                  className={`${
                    orderSide === "BUY"
                      ? "bg-green-gradient"
                      : "bg-red-gradient"
                  } w-[105px] h-[45px] rounded-lg text-3xl font-medium text-white`}
                >
                  {orderSide === "BUY" ? "Buy" : "Sell"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(
                      visiblityReducer({
                        visible: false,
                        order: {},
                      })
                    );
                    handleFormReset();
                  }}
                  className="bg-white w-[105px] h-[45px] rounded-lg font-medium border-2 border-[#a9a9a9] text-[#a9a9a9] text-3xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Draggable>
      </>
    )
  );
}
