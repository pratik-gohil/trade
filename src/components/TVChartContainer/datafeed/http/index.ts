import { ohcl } from "../../../../http/ohlc/ohlc";

export default {
  getBars: async function (
    symbolInfo,
    resolution,
    { from, to, firstDataRequest }
  ) {
    let compression;
    switch (resolution) {
      case "1":
        compression = 60;
        break;
      case "2":
        compression = 120;
        break;
      case "3":
        compression = 180;
        break;
      case "5":
        compression = 300;
        break;
      case "10":
        compression = 600;
        break;
      case "15":
        compression = 900;
        break;
      case "30":
        compression = 1800;
        break;
      case "60":
        compression = 3600;
        break;
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
        compression = resolution;
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
