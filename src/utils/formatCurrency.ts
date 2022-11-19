import { getDecimal } from "./getDecimal";
export const formatCurrency = (n = 0) =>
  Number(n).toLocaleString().split(".")[0] + ("." + (getDecimal(n) || "00"));
