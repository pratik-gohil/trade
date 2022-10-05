import http from "./http";
// import socket from "./socket";

const supportedResolutions = ["1D", "1W", "1M"];

const config = {
  supported_resolutions: supportedResolutions,
};

export default {
  onReady: (cb) => {
    console.log("=====onReady running");
    setTimeout(() => cb(config), 0);
  },
  resolveSymbol: (symbol, onSymbolResolvedCallback, onResolveErrorCallback) => {
    console.log("======resolveSymbol running");
    const [exchange, name] = symbol.split(":");

    var symbol_stub = {
      name: name,
      description: name,
      type: "stock",
      session: "0930-1600",
      timezone: "Asia/Kolkata",
      ticker: name,
      exchange,
      supported_resolution: supportedResolutions,
      data_status: "streaming",
      exchangeInstrumentID: 2885,
      minmov: 1,
      pricescale: 100,
      // intraday_multipliers: ["1", "60"],
      // has_intraday: true,
      // volume_precision: 2,
    };

    setTimeout(function () {
      onSymbolResolvedCallback(symbol_stub);
    }, 0);
  },
  getBars: async function (
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) {
    console.log("=====getBars running");

    http
      .getBars(symbolInfo, resolution, periodParams)
      .then((bars) => {
        if (bars.length > 0) {
          console.log(bars);
          onHistoryCallback(bars, { noData: false });
        } else {
          onHistoryCallback(bars, { noData: true });
        }
      })
      .catch((err) => {
        console.log({ err });
        onErrorCallback(err);
      });
  },
  // subscribeBars: (
  //   symbolInfo,
  //   resolution,
  //   onRealtimeCallback,
  //   subscriberUID,
  //   onResetCacheNeededCallback
  // ) => {
  //   console.log("=====subscribeBars runnning");
  //   socket.subscribeBars(
  //     symbolInfo,
  //     resolution,
  //     onRealtimeCallback,
  //     subscriberUID,
  //     onResetCacheNeededCallback
  //   );
  // },
  // unsubscribeBars: (subscriberUID) => {
  //   console.log("=====unsubscribeBars runnning");
  //   socket.unsubscribeBars(subscriberUID);
  // },
};
