import React, { useContext, useEffect, useMemo, useState } from "react";

import { getOrders } from "../../http/getOrders/getOrders";
import { subscribeInstruments } from "../../http/subscribeInstruments/subscribeInstruments";
import { Segments } from "../../types/enums/segment.enums.types";
import { SocketContext } from "../../socket";
import { IMarketDepth } from "../../types/interfaces/marketDepth.interfaces.types";
import { unsubscribeInstruments } from "../../http/unsubscribeInstruments/unsubscribeInstruments";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import OpenOrders from "./OpenOrders";
import ExecutedOrders from "./ExecutedOrders";
import GTTOrders from "./GTTOrders";

export interface Data {
  id: string;
  time: string;
  action: string;
  scrips: string;
  qty: string;
  product: string;
  orderPrice: number;
  ltp: number;
}

export interface IOrder {
  LoginID: string;
  ClientID: string;
  AppOrderID: number;
  OrderReferenceID: string;
  GeneratedBy: string;
  ExchangeOrderID: string;
  OrderCategoryType: string;
  ExchangeSegment: string;
  ExchangeInstrumentID: number;
  OppositeExchangeInstrumentID: number;
  OrderSide: string;
  OrderType: string;
  ProductType: string;
  TimeInForce: string;
  IsAMO: boolean;
  OrderPrice: number;
  OrderQuantity: number;
  OrderStopPrice: number;
  TradingSymbol: string;
  OrderStatus: string;
  AverageTradedPrice: string;
  OrderAverageTradedPrice: string;
  LeavesQuantity: number;
  CumulativeQuantity: number;
  OrderDisclosedQuantity: number;
  OrderGeneratedDateTime: string;
  ExchangeTransactTime: string;
  LastUpdateDateTime: string;
  OrderExpiryDate: string;
  CancelRejectReason: string;
  OrderUniqueIdentifier: string;
  OrderLegStatus: string;
  BoLegDetails: number;
  IsSpread: boolean;
  BoEntryOrderId: string;
  MessageCode: number;
  MessageVersion: number;
  TokenID: number;
  ApplicationType: number;
  SequenceNumber: number;
}

export type Order = "asc" | "desc";

export interface IOrderWithMarketDepth extends IOrder, IMarketDepth {
  ExchangeSegment: any;
}

const filters = [
  { name: "Orders", filter: "Orders" },
  { name: "GTT", filter: "GTT" },
  { name: "Basket", filter: "Basket" },
  { name: "SIP", filter: "SIP" },
  { name: "Alerts", filter: "Alerts" },
  { name: "IPO", filter: "IPO" },
];

export function Orders() {
  const [orders, setOrders] = useState<IOrderWithMarketDepth[]>([]);
  const { socket } = useContext(SocketContext) as { socket: any };
  const isOpen = useSelector((state: RootState) => state.orderModal.visible);
  const [filterType, setFilterType] = useState("All");

  const fetchOrders = async () => {
    let orderIds;
    const response = await getOrders();
    if (response.type === "success") {
      setOrders(response.result);
      orderIds = response.result.map((order) => ({
        exchangeSegment: Segments[order.ExchangeSegment],
        exchangeInstrumentID: order.ExchangeInstrumentID,
      }));
      if (orderIds) {
        subscribeInstruments({ instruments: orderIds });
      }

      return orderIds;
    }
  };

  useEffect(() => {
    let orderIds;
    (async () => {
      if (!isOpen) {
        orderIds = await fetchOrders();
      }
    })();

    return () => {
      if (orderIds) {
        unsubscribeInstruments({ instruments: orderIds });
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const listener = (res) => {
      const data = JSON.parse(res);
      setOrders((orders) => {
        return orders.map((order) =>
          order.ExchangeInstrumentID === data.ExchangeInstrumentID
            ? { ...order, ...data }
            : order
        );
      });
    };
    socket.on("1501-json-full", listener);

    return () => {
      socket.off("1501-json-full", listener);
    };
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
      <div className="p-5 flex-1 overflow-y-scroll flex flex-col gap-5">
        <OpenOrders orders={orders} fetchOrders={fetchOrders} />
        <ExecutedOrders orders={orders} fetchOrders={fetchOrders} />
        <GTTOrders fetchOrders={fetchOrders} />
      </div>
      <div className="sticky flex gap-4 bottom-0 w-full border-t px-5 py-2 bg-white">
        {filters.map((filter) => (
          <div
            key={filter.name}
            className={`${
              filter.filter === filterType ? "selected-tab" : "text-secondary"
            } py-1 px-2 rounded cursor-pointer text-lg`}
            onClick={() => setFilterType(filter.filter)}
          >
            {filter.name}
          </div>
        ))}
      </div>
    </div>
  );
}
