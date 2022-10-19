export const toFixedN = (n: number = 0, to: number = 2) =>
  Number(n || 0).toFixed(to);
