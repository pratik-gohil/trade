import React, { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableHead } from "./EnhancedTableHead";
import { Data, Order } from "./Orders";

export default function ExecutedOrders({ orders }) {
  const [allowSelection, setAllowSelection] = useState(false);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("time");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = useState("");

  const executedOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        !!~["Filled", "Cancelled", "Rejected"].indexOf(order.OrderStatus) &&
        order.TradingSymbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    orders
  ) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((n) => n.AppOrderID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: number) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: number) => selected.indexOf(name) !== -1;

  return (
    <div className="p-5">
      <Box sx={{ width: "100%" }}>
        <EnhancedTableToolbar
          heading="Executed Orders"
          allowSelection={allowSelection}
          setAllowSelection={setAllowSelection}
          numSelected={selected.length}
          search={search}
          setSearch={setSearch}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              allowSelection={allowSelection}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(e) => handleSelectAllClick(e, executedOrders)}
              onRequestSort={handleRequestSort}
              rowCount={executedOrders.length}
            />
            <TableBody className="max-h-28 overflow-auto">
              {executedOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.AppOrderID);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      // onClick={(event) => {
                      //   setAllowSelection(true);
                      //   handleClick(event, row.AppOrderID);
                      // }}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.AppOrderID}
                      selected={isItemSelected}
                    >
                      {allowSelection && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="secondary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                      )}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <span className="text-base">
                          {row.ExchangeTransactTime.split(" ")[1]}
                        </span>
                      </TableCell>
                      <TableCell className="!flex !gap-2" align="right">
                        <span
                          className={`${
                            row.OrderStatus === "Filled"
                              ? "text-success bg-successHighlight"
                              : row.OrderStatus === "Rejected"
                              ? "text-failure bg-failureHighlight"
                              : "text-warning bg-warningHighlight"
                          } text-xs rounded-[4px] py-[5px] px-[6px] font-medium`}
                        >
                          {row.OrderStatus === "Filled"
                            ? "Executed"
                            : row.OrderStatus}
                        </span>
                        <span
                          className={`${
                            row.OrderSide === "BUY"
                              ? "text-success bg-successHighlight"
                              : "text-failure bg-failureHighlight"
                          } text-xs rounded-[4px] py-[5px] px-[6px] font-medium`}
                        >
                          {row.OrderSide}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span className="text-base text-primary">
                          {row.TradingSymbol}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span className="text-[#a9a9a9] text-base">
                          {row.OrderPrice}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span
                          className={`${
                            row.ProductType === "MIS" ||
                            row.ProductType === "INTRA"
                              ? "text-purple bg-purpleHighlight"
                              : "text-blue bg-blueHighlight"
                          } text-xs rounded-[4px] py-[5px] px-[6px]`}
                        >
                          {row.ProductType}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span className="text-primary text-base">
                          {row.OrderPrice}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span className="text-primary text-base">
                          {row?.Touchline?.LastTradedPrice || 0}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={executedOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
}
