import { Segments } from "./../../../../types/enums/segment.enums.types";
import { subscribeInstruments } from "../../../../http/subscribeInstruments/subscribeInstruments";
import { socket } from "../../../../socket";
import { unsubscribeInstruments } from "../../../../http/unsubscribeInstruments/unsubscribeInstruments";

const channelToSubscription = new Map();

export default {
  subscribeBars: async function (
    symbolInfo,
    resolution,
    updateCb,
    uid,
    resetCache,
    lastDailyBar
  ) {
    const channelString = `${symbolInfo.exchange}-${symbolInfo.exchangeInstrumentID}`;
    const handler = {
      id: uid,
      callback: updateCb,
    };
    let subscriptionItem = channelToSubscription.get(channelString);
    if (subscriptionItem) {
      // already subscribed to the channel, use the existing subscription
      subscriptionItem.handlers.push(handler);
      return;
    }
    subscriptionItem = {
      uid,
      resolution,
      lastDailyBar,
      handlers: [handler],
    };
    channelToSubscription.set(channelString, subscriptionItem);
    console.log(
      "[subscribeBars]: Subscribe to streaming. Channel:",
      channelString
    );

    await subscribeInstruments({
      instruments: [
        {
          exchangeSegment: Segments[symbolInfo.exchange],
          exchangeInstrumentID: symbolInfo.exchangeInstrumentID,
        },
      ],
      xtsMessageCode: 1505,
    });
  },
  unsubscribeBars: async function (subscriberUID) {
    for (const channelString of channelToSubscription.keys()) {
      const [exchange, id] = channelString.split("-");
      const subscriptionItem = channelToSubscription.get(channelString);
      const handlerIndex = subscriptionItem.handlers.findIndex(
        (handler) => handler.id === subscriberUID
      );

      if (handlerIndex !== -1) {
        // remove from handlers
        subscriptionItem.handlers.splice(handlerIndex, 1);

        if (subscriptionItem.handlers.length === 0) {
          // unsubscribe from the channel, if it was the last handler
          console.log(
            "[unsubscribeBars]: Unsubscribe from streaming. Channel:",
            channelString
          );
          await unsubscribeInstruments({
            instruments: [
              {
                exchangeSegment: exchange,
                exchangeInstrumentID: id,
              },
            ],
            xtsMessageCode: 1505,
          });
          channelToSubscription.delete(channelString);
          break;
        }
      }
    }
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
  console.log("chart socket data", data);

  //

  const {
    ExchangeSegment,
    ExchangeInstrumentID,
    BarTime,
    Open,
    High,
    Low,
    Close,
  } = data;
  const channelString = `${ExchangeSegment}-${ExchangeInstrumentID}`;
  const subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem === undefined) {
    return;
  }
  const lastDailyBar = subscriptionItem.lastDailyBar;
  const nextDailyBarTime = lastDailyBar.time;

  let bar;
  if (BarTime >= nextDailyBarTime) {
    bar = {
      time: nextDailyBarTime,
      open: Open,
      high: High,
      low: Low,
      close: Close,
    };
    console.log("[socket] Generate new bar", bar);
  } else {
    bar = {
      ...lastDailyBar,
      high: High,
      low: Low,
      close: Close,
    };
    console.log("[socket] Update the latest bar by price", High);
  }
  subscriptionItem.lastDailyBar = bar;

  // send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach((handler) => handler.callback(bar));
};
socket.on("1505-json-full", listener);
