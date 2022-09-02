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

export function Orders() {
  const [orders, setOrders] = useState<IOrderWithMarketDepth[]>([]);
  const { socket } = useContext(SocketContext) as { socket: any };
  const isOpen = useSelector((state: RootState) => state.orderModal.visible);

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
    <>
      <OpenOrders orders={orders} fetchOrders={fetchOrders} />
      <ExecutedOrders orders={orders} fetchOrders={fetchOrders} />
      <GTTOrders fetchOrders={fetchOrders} />
    </>
  );
}
