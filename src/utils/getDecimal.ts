import { toFixedN } from "./toFixedN";
export const getDecimal = (n) => Number(toFixedN(n - Math.floor(n)));
