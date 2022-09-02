import React, { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableHead, HeadCell } from "./EnhancedTableHead";
import { Data, IOrderWithMarketDepth, Order } from "./Orders";

const headCells: readonly HeadCell[] = [
  {
    id: "time",
    numeric: false,
    disablePadding: true,
    label: "Time",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
  {
    id: "scrips",
    numeric: true,
    disablePadding: false,
    label: "Scrips",
  },
  {
    id: "qty",
    numeric: true,
    disablePadding: false,
    label: "Qty",
  },
  {
    id: "product",
    numeric: true,
    disablePadding: false,
    label: "Product",
  },
  {
    id: "orderPrice",
    numeric: true,
    disablePadding: false,
    label: "Order Price",
  },
  {
    id: "ltp",
    numeric: true,
    disablePadding: false,
    label: "LTP",
  },
];

interface IExecutedOrders {
  orders: IOrderWithMarketDepth[];
  fetchOrders?: () => void;
}

export default function ExecutedOrders({ orders }: IExecutedOrders) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("time");
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (a, b) => {
    let key;
    switch (orderBy) {
      case "time":
        key = "ExchangeTransactTime";
        break;
      case "action":
        key = "OrderSide";
        break;
      case "scrips":
        key = "TradingSymbol";
        break;
      case "qty":
        key = "OrderQuantity";
        break;
      case "product":
        key = "ProductType";
        break;
      case "orderPrice":
        key = "OrderPrice";
        break;
      case "ltp":
        key = "LastTradedPrice";
        break;
      default:
        key = undefined;
    }

    if (key !== undefined) {
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        if (order === "asc") {
          return a[key] - b[key];
        } else {
          return b[key] - a[key];
        }
      } else if (typeof a[key] === "string" && typeof b[key] === "string") {
        if (order === "asc") {
          return a[key].localeCompare(b[key]);
        } else {
          return b[key].localeCompare(a[key]);
        }
      }
    }
  };

  return (
    <div className="p-5">
      <Box sx={{ width: "100%" }}>
        <EnhancedTableToolbar
          heading="Executed Orders"
          search={search}
          setSearch={setSearch}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={executedOrders.length}
            />
            <TableBody className="max-h-28 overflow-auto">
              {executedOrders
                .sort(handleSort)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      // hover
                      // onClick={(event) => {
                      //   setAllowSelection(true);
                      //   handleClick(event, row.AppOrderID);
                      // }}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.AppOrderID}
                    >
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
                      <TableCell className="!flex !gap-2">
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
                      <TableCell>
                        <span className="text-base text-primary">
                          {row.TradingSymbol}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-[#a9a9a9] text-base">
                          {row.OrderQuantity}
                        </span>
                      </TableCell>
                      <TableCell>
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
                      <TableCell>
                        <span className="text-primary text-base">
                          {row.OrderAverageTradedPrice || "-"}
                        </span>
                      </TableCell>
                      <TableCell>
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
