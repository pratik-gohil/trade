import { toFixedN } from "./toFixedN";

export const percDiff = (a, b) => toFixedN((100 * (a - b)) / ((a + b) / 2), 2);
