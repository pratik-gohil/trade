import { toFixedN } from "./toFixedN";
// export const getDecimal = (n) => Number(toFixedN(n - Math.floor(n)));
export const getDecimal = (n) => Number(toFixedN(n).split(".")[1]) || 0;
