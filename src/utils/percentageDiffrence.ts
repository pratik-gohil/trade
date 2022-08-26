export const percDiff = (a, b) =>
  parseFloat(((100 * (a - b)) / ((a + b) / 2)).toFixed(2));
