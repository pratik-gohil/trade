import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { EnhancedTableHead, HeadCell } from "../../Orders/EnhancedTableHead";
import { Order } from "../../Orders";
import { getCorporateAction } from "../../../http/fundamental/CorporateAction/Dividend";

function CorporateActionTable({ type, instrument }) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("scrips");
  const [actions, setActions] = useState<any>([]);
  const [headCells, setHeadCells] = useState<any>([]);
  const [cols, setCols] = useState<any>([
    "exdate",
    "amount",
    "dividend_type",
    "record_date",
  ]);

  useEffect(() => {
    // if (type && instrument) {
    getCorporateAction({ type, name: instrument.DisplayName }).then((res) => {
      console.log(type, res[type]);
      if (res.tableHeaders && res[type]) {
        const _cols = res.tableHeaders.map(({ unique_name }) => unique_name);
        setCols(_cols);

        setHeadCells(
          res.tableHeaders.map((header) => ({
            id: header.unique_name,
            label: header.name,
          }))
        );

        setActions(
          res[type].map((action) => {
            return _cols.reduce((a, b, i) => ({ ...a, [b]: action[i] }), {});
          })
        );
      }
    });

    console.log(cols, actions);
    // }
  }, [type, instrument]);

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table>
          <EnhancedTableHead
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={() => {}}
            rowCount={actions.length}
          />
          <TableBody sx={{ minWidth: 750 }} className="max-h-28 overflow-auto">
            {actions.map((action, index) => (
              <TableRow tabIndex={-1} key={index.toString()}>
                {cols.map((col, i) => (
                  <TableCell key={i}>{action[col]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CorporateActionTable;
