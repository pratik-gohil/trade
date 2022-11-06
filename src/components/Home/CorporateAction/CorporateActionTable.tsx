import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { EnhancedTableHead, HeadCell } from "../../Orders/EnhancedTableHead";
import { Order } from "../../Orders";
import { getCorporateAction } from "../../../http/fundamental/CorporateAction";

function CorporateActionTable({ type, instrument }) {
  const [order, setOrder] = useState<Order>("desc");
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
      if (res.tableHeaders && res[type]) {
        const _cols = res.tableHeaders.map(({ unique_name, type }) => ({
          unique_name,
          type,
        }));
        setCols(_cols);

        setHeadCells(
          res.tableHeaders.map((header) => ({
            id: header.unique_name,
            label: header.name,
          }))
        );

        setActions(
          res[type].map((action) => {
            return _cols.reduce(
              (a, b, i) => ({
                ...a,
                [b.unique_name]: action[i],
              }),
              {}
            );
          })
        );
      }
    });

    // }
  }, [type, instrument]);

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
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
                  <TableCell
                    key={i}
                    className={`${
                      col.type === "date" ? "whitespace-nowrap" : ""
                    }`}
                  >
                    {action[col.unique_name]}
                  </TableCell>
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
