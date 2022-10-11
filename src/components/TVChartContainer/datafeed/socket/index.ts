import http from "../http";
import { Segments } from "./../../../../types/enums/segment.enums.types";
import { subscribeInstruments } from "../../../../http/subscribeInstruments/subscribeInstruments";
import { socket } from "../../../../socket";
let _subs: any[] = [];

export default {
  subscribeBars: async function (
    symbolInfo,
    resolution,
    updateCb,
    uid,
    resetCache
  ) {
    await subscribeInstruments({
      instruments: [
        {
          exchangeSegment: Segments[symbolInfo.exchange],
          exchangeInstrumentID: symbolInfo.exchangeInstrumentID,
        },
      ],
      xtsMessageCode: 1505,
    });

    const newSub = {
      exchangeInstrumentID: symbolInfo.exchangeInstrumentID,
      uid,
      resolution,
      symbolInfo,
      lastBar: http.history[symbolInfo.name].lastBar,
      listener: updateCb,
    };

    _subs.push(newSub);
  },
  unsubscribeBars: function (subscriberUID) {
    var subIndex = _subs.findIndex((e) => e.uid === subscriberUID);
    if (subIndex === -1) {
      console.log("No subscription found for ", subscriberUID);
      return;
    }

    _subs.splice(subIndex, 1);
  },
};

socket.on("connect", () => {
  console.log("===Socket connected");
});
socket.on("disconnect", (e) => {
  console.log("===Socket disconnected:", e);
});
socket.on("error", (err) => {
  console.log("====socket error", err);
});

const listener = (res) => {
  const data = JSON.parse(res);
  console.log(data);
};
socket.on("1505-json-full", listener);
