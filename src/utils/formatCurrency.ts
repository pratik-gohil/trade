import { getDecimal } from "./getDecimal";
export const formatCurrency = (n = 0) =>
  (Number(n) || 0).toLocaleString().split(".")[0] +
  ("." + (getDecimal(n) || "00"));
