import React, { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableHead, HeadCell } from "./EnhancedTableHead";
import { Data, IOrderWithMarketDepth, Order } from "./Orders";
import { OrderTableRow } from "./OrderTableRow";
import OrderDetailsModal from "./OrderDetailsModal";

const headCells: readonly HeadCell[] = [
  {
    id: "time",

    label: "Time",
  },
  {
    id: "action",

    label: "Action",
  },
  {
    id: "scrips",

    label: "Scrips",
  },
  {
    id: "qty",

    label: "Qty",
  },
  {
    id: "product",

    label: "Product",
  },
  {
    id: "orderPrice",
    alignment: "right",

    label: "Order Price",
  },
  {
    id: "ltp",
    alignment: "right",

    label: "LTP",
  },
];

interface IExecutedOrders {
  orders: IOrderWithMarketDepth[];
  fetchOrders?: () => void;
}

export default function ExecutedOrders({ orders }: IExecutedOrders) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("time");

  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState<IOrderWithMarketDepth | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState({
    type: "",
    id: "",
  });
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

  if (!(executedOrders.length > 0)) return null;

  return (
    <div>
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

                .map((row, index) => {
                  return (
                    <OrderTableRow
                      isExecuted
                      showOrderStatus
                      key={index}
                      row={row}
                      index={index}
                      setShowDetails={setShowDetails}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <OrderDetailsModal
        setShowDetails={setShowDetails}
        showDetails={showDetails}
      />
    </div>
  );
}
