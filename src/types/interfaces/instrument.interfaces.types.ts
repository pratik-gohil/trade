export interface IInstrument {
  AGM: boolean;
  AllOrNone: boolean;
  Bonus: boolean;
  Dividend: boolean;
  EGM: boolean;
  AuctionDetailInfo: AuctionDetailInfo;
  ELMargin: number;
  Interest: boolean;
  ISIN: string;
  MinimumFill: boolean;
  Rights: boolean;
  VaRMargin: number;
  IssuedCapital: number;
  BoardLotQuantity: number;
  FaceValue: number;
  Spread: number;
  CallAuction1Flag: boolean;
  GSMIndicator: number;
  SettlementNo: string;
  IsRollOverContract: boolean;
  SourceSeries: string;
  TargetSeries: string;
  ExDate: string;
  isExpanded: boolean;
  StrikePrice: number;
  OptionType: number;
  StrikeDifference: number;
  ContractExpiration: string;
  RemainingExpiryDays: number;
  RemainingExpiryDaysABS: number;
  ContractExpirationString: string;
  HasContractExpired: boolean;
  UnderlyingType: number;
  UnderlyingInstrumentId: number;
  UnderlyingIndexName: string;
  InstrumentID: number;
  ExchangeInstrumentID: number;
  PreferredExchangeInstrumentID: number;
  PreferredExchangeSegment: number;
  OppositeExchangeInstrumentID: number;
  OppositeExchangeSegment: number;
  DisplayName: string;
  Name: string;
  AuctionNumber: number;
  MinimumQty: number;
  IsIndex: boolean;
  QuantityMultiplier: number;
  Multiplier: number;
  PriceNumerator: number;
  PriceDenominator: number;
  LotSize: number;
  InstrumentType: number;
  SymbolType: number;
  CfiCode: string;
  Status: string;
  TicksPerPoint: number;
  TickSize: number;
  ByPassDPR: boolean;
  Description: string;
  IsImpliedMarket: boolean;
  IsTradeable: boolean;
  ExchangeSegment: number;
  Series: string;
  MaxTradeVolume: number;
  PriceBand: PriceBand;
  DecimalDisplace: number;
  ExtendedMarketProperties: ExtendedMarketProperties;
  MarketTypeStatusEligibility: MarketTypeStatusEligibility;
  NameWithExchange: string;
  NameWithSeries: string;
  DisplayNameWithExchange: string;
  DisplayNameWithSeries: string;
  DisplayNameWithSeriesAndExchange: string;
  FreezeQty: number;
  LastUpdateTime: number;
  FiftyTwoWeekHigh: number;
  FiftyTwoWeekLow: number;
  Bhavcopy: Bhavcopy;
  AdditionalPreExpiryMarginPerc: number;
  AdditionalMarginPercLong: number;
  AdditionalMarginPercShort: number;
  DeliveryMarginPerc: number;
  SpecialMarginPercBuy: number;
  SpecialMarginPercSell: number;
  TenderMargin: number;
  ELMLongMargin: number;
  ELMShortMargin: number;
  InitialMarginPerc: number;
  ExposureMarginPerc: number;
  CallAuctionIndicator: number;
  MarketType: number;
  CurrentEligibleMarketType: number;
  InstrumentProductType: number;
  TotalMargin: number;
  SettlementIndicator: string;
  Industry: number;
  MessageCode: number;
  MessageVersion: number;
  ApplicationType: number;
  TokenID: number;
  ExchangeTimeStamp: number;
  Bids: Bid[];
  Asks: Bid[];
  Touchline: Touchline;
  BookType: number;
  XMarketType: number;
  SequenceNumber: number;
}

interface Touchline {
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

interface Bid {
  Size: number;
  Price: number;
  TotalOrders: number;
  BuyBackMarketMaker: number;
}

interface Bhavcopy {
  Open: number;
  High: number;
  Low: number;
  Close: number;
  TotTrdQty: number;
  TotTrdVal: number;
  TimeStamp: string;
  TotalTrades: number;
  OpenInterest: number;
  SettlementPrice: number;
}

interface MarketTypeStatusEligibility {
  Normal: Normal;
  OddLot: Normal;
  RetailDebt: Normal;
  Auction: Normal;
}

interface Normal {
  MarketType: number;
  Eligibile: boolean;
  TradingStatus: number;
}

interface ExtendedMarketProperties {
  SettlementNo: SettlementNo;
  UniqueKey: SettlementNo;
  CompanyName: SettlementNo;
  IssueStartDate: SettlementNo;
  IssueMaturityDate: SettlementNo;
  ListingDate: SettlementNo;
  BookClosureStartDate: SettlementNo;
  BookClosureEndDate: SettlementNo;
  RecordDate: SettlementNo;
  ExpulsionDate: SettlementNo;
  Remarks: SettlementNo;
  MaxOrderQuantity: SettlementNo;
  ExposureMargin: SettlementNo;
  ExDate: SettlementNo;
  CallAuctionIndicator: SettlementNo;
  MarketType: SettlementNo;
}

interface SettlementNo {
  Name: number;
  Value: string;
}

interface PriceBand {
  High: number;
  Low: number;
  HighString: string;
  LowString: string;
  CreditRating: string;
  HighExecBandString: string;
  LowExecBandString: string;
  HighExecBand: number;
  LowExecBand: number;
  TERRange: string;
}

interface AuctionDetailInfo {
  AuctionNumber: number;
  AuctionStatus: number;
  InitiatorType: number;
  SettlementPeriod: number;
  TotalBuyQty: number;
  TotalSellQty: number;
  AuctionQty: number;
  AuctionPrice: number;
  BestBuyPrice: number;
  BestSellPrice: number;
}
