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
            instrumentType: segment[2],
            name: segment[3],
            description: segment[4],
            series: segment[5],
            nameWithSeries: segment[6],
            instrumentID: segment[7],
            highPriceBand: segment[8],
            lowPriceBand: segment[9],
            freezeQty: segment[10],
            tickSize: segment[11],
            lotSize: segment[12],
            multiplier: segment[12],
            underlyingInstrumentId: "0.0",
            underlyingIndexName: "0.0",
            contractExpiration: "0.0",
            strikePrice: "0.0",
            optionType: "0.0",
            DisplayName: segment.length > 14 ? segment[14] : "0.0",
            ISIN: segment.length > 15 ? segment[15] : "0.0",
            Numerator: segment.length > 16 ? segment[16] : "0.0",
            Denominator: segment.length > 17 ? segment[17] : "0.0",
          };
        } else if (segment[0] === "NSEFO") {
          // print(segment[5].substring(0, 3});
          if (segment[5].substring(0, 3) === "FUT") {
            return {
              exchangeSegment: segment[0],
              exchangeInstrumentID: segment[1],
              instrumentType: segment[2],
              name: segment[3],
              description: segment[4],
              series: segment[5],
              nameWithSeries: segment[6],
              instrumentID: segment[7],
              highPriceBand: segment[8],
              lowPriceBand: segment[9],
              freezeQty: segment[10],
              tickSize: segment[11],
              lotSize: segment[12],
              multiplier: segment[13],
              underlyingInstrumentId: segment.length > 14 ? segment[14] : "0.0",
              underlyingIndexName: segment.length > 15 ? segment[15] : "0.0",
              contractExpiration: segment.length > 16 ? segment[16] : "0.0",
              strikePrice: "0.0",
              optionType: "0.0",
              DisplayName: segment.length > 17 ? segment[17] : "0.0",
              ISIN: "0.0",
              Numerator: segment.length > 18 ? segment[18] : "0.0",
              Denominator: segment.length > 19 ? segment[19] : "0.0",
            };
          } else {
            return {
              exchangeSegment: segment[0],
              exchangeInstrumentID: segment[1],
              instrumentType: segment[2],
              name: segment[3],
              description: segment[4],
              series: segment[5],
              nameWithSeries: segment[6],
              instrumentID: segment[7],
              highPriceBand: segment[8],
              lowPriceBand: segment[9],
              freezeQty: segment[10],
              tickSize: segment[11],
              lotSize: segment[12],
              multiplier: segment[13],
              underlyingInstrumentId: segment.length > 14 ? segment[14] : "0.0",
              underlyingIndexName: segment.length > 15 ? segment[15] : "0.0",
              contractExpiration: segment.length > 16 ? segment[16] : "0.0",
              strikePrice: segment.length > 17 ? segment[17] : "0.0",
              optionType: segment.length > 18 ? segment[18] : "0.0",
              DisplayName: segment.length > 19 ? segment[19] : "0.0",
              ISIN: "0.0",
              Numerator: segment.length > 20 ? segment[20] : "0.0",
              Denominator: segment.length > 21 ? segment[21] : "0.0",
            };
          }
        } else {
          return {
            exchangeSegment: segment[0],
            exchangeInstrumentID: segment[1],
            instrumentType: segment[2],
            name: segment[3],
            description: segment[4],
            series: segment[5],
            nameWithSeries: segment[6],
            instrumentID: segment[7],
            highPriceBand: segment[8],
            lowPriceBand: segment[9],
            freezeQty: segment[10],
            tickSize: segment[11],
            lotSize: segment[12],
            multiplier: segment[13],
            underlyingInstrumentId: segment.length > 14 ? segment[14] : "0.0",
            underlyingIndexName: segment.length > 15 ? segment[15] : "0.0",
            contractExpiration: segment.length > 16 ? segment[16] : "0.0",
            strikePrice: "0.0",
            optionType: "0.0",
            DisplayName: segment.length > 17 ? segment[17] : "0.0",
            ISIN: "0.0",
            Numerator: segment.length > 18 ? segment[18] : "0.0",
            Denominator: segment.length > 19 ? segment[19] : "0.0",
          };
        }
      });
    return master;
  }
};
