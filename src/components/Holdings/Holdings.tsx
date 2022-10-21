import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { EnhancedTableHead, HeadCell } from "../Orders/EnhancedTableHead";
import { Order } from "../Orders";
import { getHoldings } from "../../http/holdings/getHoldings";

const headCells: readonly HeadCell[] = [
  {
    id: "scrips",
    numeric: false,
    disablePadding: true,
    label: "Scrips",
  },
  {
    id: "qty",
    numeric: false,
    disablePadding: false,
    label: "Qty",
  },
  {
    id: "holding_days",
    numeric: true,
    disablePadding: false,
    label: "Holding Days",
  },
  {
    id: "avgPrice",
    numeric: true,
    disablePadding: true,
    label: "Avg Price",
  },
  {
    id: "ltp",
    numeric: true,
    disablePadding: false,
    label: "LTP",
  },
  {
    id: "invested",
    numeric: true,
    disablePadding: false,
    label: "Invested",
  },
  {
    id: "current",
    numeric: true,
    disablePadding: false,
    label: "Current",
  },
  {
    id: "p&l",
    numeric: true,
    disablePadding: false,
    label: "P&L",
  },

  {
    id: "perChg",
    numeric: true,
    disablePadding: false,
    label: "% Chg",
  },
];

function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>("scrips");

  useEffect(() => {
    getHoldings().then((res) => {
      setHoldings(res.result.holdingsList);
    });
  }, []);

  const handleRequestSort = () => {};

  return (
    <>
      <div className="p-5">
        <Box sx={{ width: "100%" }}>
          <TableContainer>
            <Table>
              <EnhancedTableHead
                headCells={headCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={holdings.length}
              />
              <TableBody
                sx={{ minWidth: 750 }}
                className="max-h-28 overflow-auto"
              >
                {holdings.map((holding, index) => (
                  <TableRow tabIndex={-1} key={index.toString()}>
                    <TableCell>Adani</TableCell>
                    <TableCell>Adani</TableCell>
                    <TableCell>Adani</TableCell>
                    <TableCell>Adani</TableCell>
                    <TableCell>Adani</TableCell>
                    <TableCell>Adani</TableCell>
                    <TableCell>Adani</TableCell>
                    <TableCell>Adani</TableCell>
                    <TableCell>Adani</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </>
  );
}

export default Holdings;
