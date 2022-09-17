import { getMaster } from "../../http/master/master";

export interface IMasterInstrument {
  exchangeSegment: string;
  exchangeInstrumentID: string;
  instrumentType: string;
  name: string;
  description: string;
  series: string;
  nameWithSeries: string;
  instrumentID: string;
  highPriceBand: string;
  lowPriceBand: string;
  freezeQty: string;
  tickSize: string;
  lotSize: string;
  multiplier: string;
  underlyingInstrumentId: string;
  underlyingIndexName: string;
  contractExpiration: string;
  strikePrice: string;
  optionType: string;
  DisplayName: string;
  ISIN: string;
  Numerator: string;
  Denominator: string;
}

export const mapMaster = async (exchangeSegment) => {
  const response = await getMaster(exchangeSegment);
  if (response.type === "success") {
    let master = response.result
      .split("\n")
      .map((str) => str.split("|"))
      .map((segment) => {
        if (segment[0] === "NSECM" || segment[0] === "BSECM") {
          return {
            exchangeSegment: segment[0],
            exchangeInstrumentID: segment[1],
            name: segment[3],
            DisplayName: segment[14],
          };
        } else if (segment[0] === "NSEFO") {
          // segment[5].substring(0, 3)
          if (segment[5].substring(0, 3) === "FUT") {
            return {
              exchangeSegment: segment[0],
              exchangeInstrumentID: segment[1],
              name: segment[3],
              DisplayName: segment.length > 17 ? segment[17] : "0.0",
            };
          } else {
            return {
              exchangeSegment: segment[0],
              exchangeInstrumentID: segment[1],
              name: segment[3],
              DisplayName: segment.length > 19 ? segment[19] : "0.0",
            };
          }
        } else {
          if (segment[5].substring(0, 3) === "OPT") {
            return {
              exchangeSegment: segment[0],
              exchangeInstrumentID: segment[1],
              name: segment[3],
              DisplayName: segment.length > 19 ? segment[19] : "0.0",
            };
          } else {
            return {
              exchangeSegment: segment[0],
              exchangeInstrumentID: segment[1],
              name: segment[3],
              DisplayName: segment.length > 17 ? segment[17] : "0.0",
            };
          }
        }
      });

    return master;
  }
};
