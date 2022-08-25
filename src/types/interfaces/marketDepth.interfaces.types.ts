export interface IMarketDepth {
  MessageCode: number;
  MessageVersion: number;
  ApplicationType: number;
  TokenID: number;
  ExchangeSegment: number;
  ExchangeInstrumentID: number;
  ExchangeTimeStamp: number;
  Bids: Bid[];
  Asks: Bid[];
  Touchline: Touchline;
  BookType: number;
  XMarketType: number;
  SequenceNumber: number;
}

export interface Touchline {
  BidInfo: Bid;
  AskInfo: Bid;
  LastTradedPrice: number;
  LastTradedQunatity: number;
  TotalBuyQuantity: number;
  TotalSellQuantity: number;
  TotalTradedQuantity: number;
  AverageTradedPrice: number;
  LastTradedTime: number;
  LastUpdateTime: number;
  PercentChange: number;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  TotalValueTraded?: any;
  BuyBackTotalBuy: number;
  BuyBackTotalSell: number;
}

export interface Bid {
  Size: number;
  Price: number;
  TotalOrders: number;
  BuyBackMarketMaker: number;
}
