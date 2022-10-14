import { ohcl } from "../../../../http/ohlc/ohlc";

export default {
  getBars: async function (
    symbolInfo,
    resolution,
    { from, to, firstDataRequest }
  ) {
    let compression;
    switch (resolution) {
      case "1D":
        compression = "D";
        break;
      case "1W":
        compression = "W";
        break;
      case "1M":
        compression = "M";
        break;
      default:
        compression = 60;
        break;
    }
    const bars = await ohcl({
      exchangeSegment: symbolInfo.exchange,
      exchangeInstrumentID: symbolInfo.exchangeInstrumentID,
      startTime: from,
      endTime: to,
      compressionValue: compression,
    }).then((res) => {
      if (res.type === "success") {
        const bars = res.result.dataReponse.split(",");
        return bars.map((bar) => {
          const [time, open, high, low, close, volume, OI] = bar.split("|");
          let epochTime;
          switch (compression) {
            case "D":
              epochTime = Number(time) * 1000 + 330 * 60 * 1000;
              break;
            case "W":
              epochTime = Number(time) * 1000 + 330 * 60 * 1000;
              break;
            case "M":
              epochTime = Number(time) * 1000 + 330 * 60 * 1000;
              break;
            default:
              epochTime = Number(time) * 1000;
              break;
          }
          return {
            time: epochTime,
            low,
            high,
            open,
            close,
            volume,
            openInterest: OI,
          };
        });
      } else {
        return [];
      }
    });

    return bars;
  },
};
