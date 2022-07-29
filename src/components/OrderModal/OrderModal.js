import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { NumberInput } from "../NumberInput";

let margin = 70;

export function OrderModal({ isOpen }) {
  const modalRef = useRef();
  const [vh, setVh] = useState(0);
  const [vw, setVw] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [orderType, setOrderType] = useState("SELL");

  const [price, setPrice] = useState(0);
  const [triggerPrice, setTriggerPrice] = useState(0);
  const [QTY, setQTY] = useState(0);
  const [disclosedQTY, setDisclosedQTY] = useState(0);

  useEffect(() => {
    let document_height = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    let document_width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );

    setVh(document_height - modalRef.current.clientHeight);
    setVw(document_width - modalRef.current.clientWidth);
  }, []);

  useEffect(() => {
    setPosition({ y: vh, x: vw / 2 });
  }, [vh, vw]);

  if (!isOpen) return null;

  return (
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
              orderType === "BUY"
                ? "bg-light-green-gradient"
                : "bg-pink-gradient"
            } flex justify-between items-center handle cursor-move p-4`}
          >
            <div>
              <div className="text-md">ADANIPOWER</div>
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
          </div>
          <div className="flex items-center gap-4 border-b-2 border-border text-sm font-medium">
            <div className="text-blue underline underline-offset-8 decoration-2 p-4 pb-1 cursor-pointer">
              Regular
            </div>
            <div className="p-4 pb-1 cursor-pointer">Cover</div>
            <div className="p-4 pb-1 cursor-pointer">AMO</div>
          </div>
          <div className="p-4 flex flex-col gap-4 border-b-2 border-border">
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
            <div className="flex justify-between items-center gap-10">
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
              {/* <input
                type="text"
                className="border border-border rounded-lg p-2 w-fit text-center grow-0 shrink-1"
                value={1}
              />
              <input
                type="text"
                className="border border-border rounded-lg p-2 w-fit text-center grow-0 shrink-1"
                value={280}
              />
              <input
                type="text"
                className="border border-border rounded-lg p-2 w-fit text-center grow-0 shrink-1"
                value={0}
              /> */}
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
                <label htmlFor="radio-order-modal-trade-sub-type-sl">SL</label>
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
          <div className="flex gap-8 p-4 border-b-2 border-border">
            <div className="flex flex-col gap-4">
              <div>Validity</div>
              <div className="text-xs text-primary font-medium flex items-center gap-8">
                <div
                  className="
                flex justify-center items-center gap-2"
                >
                  <input
                    name="radio-order-modal-validity"
                    id="radio-order-modal-validity-limit"
                    type="radio"
                  />
                  <label htmlFor="radio-order-modal-validity-limit">
                    Limit
                  </label>
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
                    Intermidiate
                  </label>
                </div>
              </div>
            </div>
            <NumberInput
              label="Disclosed QTY."
              value={disclosedQTY}
              onChange={(value) => setDisclosedQTY(value)}
            />
            {/* <fieldset class="border border-solid border-gray-300 px-3 rounded-lg w-fit">
              <legend class="text-sm px-2">Disclosed QTY</legend>
              <div>
                <Add fontSize="inherit" className="cursor-pointer" />
                <input
                  type="number"
                  placeholder=""
                  autocorrect="off"
                  min="1"
                  autofocus="autofocus"
                  label="Qty."
                  className="outline-0 text-center w-20 appearance-[textfield]"
                />
                <Remove fontSize="inherit" className="cursor-pointer" />
              </div>
            </fieldset> */}
            {/* <input
              type="text"
              className="border border-border rounded-lg p-2 w-fit text-center grow-0 shrink-1"
              value={0}
            /> */}
          </div>

          <div className="flex justify-between items-center p-4">
            <div className="flex flex-col gap-4 text-xs text-neutral">
              <div>Approx. Margin</div>
              <div>Approx. Margin</div>
            </div>
            <div className="flex gap-8">
              <button className="bg-green-gradient py-1.5 px-4 rounded-lg w-28 font-medium text-white">
                Buy
              </button>
              <button className="bg-white py-1.5 px-4 rounded-lg w-28 font-medium text-neutral border-2 border-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}
