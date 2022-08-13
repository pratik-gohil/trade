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
  MarketTypeStatusEligibility: ExtendedMarketProperties;
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

interface ExtendedMarketProperties {}

interface PriceBand {
  High: string;
  Low: string;
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
