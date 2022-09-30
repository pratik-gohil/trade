import { toFixedN } from "./toFixedN";

export const MTM = (ltp, avg, q) => {
  return toFixedN((ltp - avg) * Number(q), 2);
};
