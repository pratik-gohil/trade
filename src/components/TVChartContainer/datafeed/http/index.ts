import { ohcl } from "../../../../http/ohlc/ohlc";
const history = {};

// const getFormatedDateTime = (date) => {
//   const event = new Date(date);
//   var dateOptions: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "short",
//     day: "2-digit",
//   };
//   var timeOptions: Intl.DateTimeFormatOptions = {
//     hour12: false,
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//   };
//   return (
//     event.toLocaleDateString("en", dateOptions).replace(",", "") +
//     " " +
//     event.toLocaleTimeString("en", timeOptions).split(":").join("")
//   );
// };

export default {
  history: history,

  getBars: async function (
    symbolInfo,
    resolution,
    { from, to, firstDataRequest }
  ) {
    const bars = await ohcl({
      exchangeSegment: symbolInfo.exchange,
      exchangeInstrumentID: symbolInfo.exchangeInstrumentID,
      startTime: from,
      endTime: to,
      // compressionValue: resolution,
    }).then((res) => {
      if (res.type === "success") {
        const bars = res.result.dataReponse.split(",");
        return bars.map((bar) => {
          const [time, open, high, low, close, volume, OI] = bar.split("|");
          return {
            time: time * 1000,
            low,
            high,
            open,
            close,
            volume,
          };
        });
      } else {
        return [];
      }
    });

    if (firstDataRequest) {
      var lastBar = bars[bars.length - 1];
      history[symbolInfo.name] = { lastBar: lastBar };
    }

    return bars;
  },
};
