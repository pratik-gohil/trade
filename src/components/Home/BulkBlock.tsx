import React, { useState, useEffect } from "react";
import { getBulkBlockDeals } from "../../http/news/bulk&block_deals";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const fetchBulkBlockDeals = async ({ symbol }) => {
  const response = await getBulkBlockDeals({ symbol });
  return response;
};

function BulkBlock({ instrument }) {
  const [deals, setDeals] = useState<{ headers: any[]; rows: any[] }>({
    headers: [],
    rows: [],
  });
  function createData(d) {
    const [
      client_name,
      deal_type,
      action,
      date,
      average_price,
      quantity,
      traded_percent,
      exchange,
    ] = d;
    return {
      client_name,
      deal_type,
      action,
      date,
      average_price,
      quantity,
      traded_percent,
      exchange,
    };
  }

  useEffect(() => {
    fetchBulkBlockDeals({ symbol: instrument.DisplayName }).then((res) => {
      const headers = res.body.tableHeaders.map((h) => h.name);
      const rows = res.body.tableData.map((d) => createData(d));
      setDeals({
        headers,
        rows,
      });
    });
  }, []);
  return (
    <div className="border rounded-md">
      <h1 className="p-5 flex gap-4">
        <NavLink
          to="/home/bulk%20&%20block%20deals"
          className={({ isActive }) =>
            (isActive ? "text-blue font-medium" : "") + " text-lg"
          }
        >
          Bulk & Block Deals
        </NavLink>
        <NavLink
          to="/home/insider%20trades"
          className={({ isActive }) =>
            (isActive ? "text-blue font-medium" : "") + " text-lg"
          }
        >
          Insider Trades
        </NavLink>
      </h1>
      <div className="max-h-[350px] overflow-y-scroll">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {deals.headers.map((header) => (
                  <TableCell>
                    <span className="text-xs text-primary">{header}</span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ minHeight: 300 }}>
              {deals.rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <span className="text-base font-medium">
                      {row.client_name}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="text-base">{row.deal_type}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span
                      className={`text-base ${
                        row.action === "Purchase"
                          ? "text-success"
                          : "text-failure"
                      }`}
                    >
                      {row.action}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="text-base">{row.date}</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-base">{row.average_price}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="text-base">{row.quantity}</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-base">{row.traded_percent}</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-base">{row.exchange}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default BulkBlock;
