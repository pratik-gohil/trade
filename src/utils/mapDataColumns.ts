export const mapDataColumns = (columns, data) =>
  data.map((row) =>
    row.reduce((acc, cell, i) => ({ ...acc, [columns[i]]: cell }), {})
  );
