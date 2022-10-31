import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableHead, HeadCell } from "./EnhancedTableHead";
import { Data, Order } from "./Orders";
import { getGTTOrders } from "../../http/getGTTOrders/getGTTOrders";
import { toFixedN } from "../../utils/toFixedN";

const headCells: readonly HeadCell[] = [
  {
    id: "time",
    numeric: false,
    disablePadding: true,
    label: "Time",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
  {
    id: "scrips",
    numeric: false,
    disablePadding: false,
    label: "Scrips",
  },
  {
    id: "qty",
    numeric: false,
    disablePadding: false,
    label: "Qty",
  },
  {
    id: "product",
    numeric: false,
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

export default function GTTOrders({ fetchOrders }) {
  const [orders, setOrders] = useState<any>([]);
  const [allowSelection, setAllowSelection] = useState(false);
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("time");
  const [selected, setSelected] = React.useState<readonly number[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getGTTOrders().then((res) => {
      res.type === "success" && setOrders(res.result);
    });
  }, []);

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

  // const handleClick = (event: React.MouseEvent<unknown>, name: number) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected: readonly number[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const isSelected = (name: number) => selected.indexOf(name) !== -1;

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

  return orders.length > 0 ? (
    <div>
      <Box sx={{ width: "100%" }}>
        <EnhancedTableToolbar
          heading="GTT Orders"
          allowSelection={allowSelection}
          setAllowSelection={setAllowSelection}
          numSelected={selected.length}
          search={search}
          setSearch={setSearch}
        />
        <TableContainer>
          <TableContainer sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              headCells={headCells}
              allowSelection={allowSelection}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(e) => handleSelectAllClick(e, orders)}
              onRequestSort={handleRequestSort}
              rowCount={orders.length}
            />
            <TableBody className="max-h-28 overflow-auto">
              {orders
                .sort(handleSort)

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
                          {row.OrderPrice}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-primary text-base">
                          {toFixedN(row?.Touchline?.LastTradedPrice || 0)}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </TableContainer>
        </TableContainer>
      </Box>
    </div>
  ) : null;
}
