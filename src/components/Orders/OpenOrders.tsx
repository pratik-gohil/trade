import React, { Fragment, useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableHead, HeadCell } from "./EnhancedTableHead";
import { Data, IOrderWithMarketDepth, Order } from "./Orders";
import { deleteOrder } from "../../http/deleteOrder/deleteOrder";
import { OrderTableRow } from "./OrderTableRow";
import OrderDetailsModal from "./OrderDetailsModal";
import { Modal, TableCell, TableHead, TableRow } from "@mui/material";
import { useSnackbar } from "notistack";

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
    alignment: "right",
    label: "Qty",
  },
  {
    id: "product",
    alignment: "right",
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

export default function OpenOrders({ orders, fetchOrders }) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("time");
  const [selected, setSelected] = React.useState<readonly number[]>([]);

  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    type: "",
    id: "",
  });
  const [showDetails, setShowDetails] = useState<IOrderWithMarketDepth | null>(
    null
  );
  const [showCancelModal, setShowCancelModal] = useState(false);

  const openOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        !!~["New", "Open", "PendingNew", "PendingReplace", "Replaced"].indexOf(
          order.OrderStatus
        ) && order.TradingSymbol.toLowerCase().includes(search.toLowerCase())
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

  const { enqueueSnackbar } = useSnackbar();

  const showCancelOrderSnackbar = ({ id }) => {
    const order = orders.find((n) => n.AppOrderID == id);
    enqueueSnackbar(
      <div>
        <h1 className="text-failure text-2xl font-semibold">Cancelled</h1>
        <p className="font-medium text-xl text-primary py-3">
          {order.OrderSide} {order.TradingSymbol} is Cancelled
        </p>
        <span className="text-sm font-light text-primary">#{id}</span>
      </div>,
      {
        sx: {
          "& .SnackbarContent-root": {
            backgroundColor: "white",
            border: "1px solid red",
          },
        },
      } as any
    );
  };

  const cancelOrder = (id) => {
    deleteOrder({ appOrderID: id })
      .then((res) => {
        showCancelOrderSnackbar({ id });
      })
      .then(() => {
        fetchOrders();
      });
  };

  const handleCancelAll = () => {
    selected.map((id) => cancelOrder(id));
  };

  const handleCancel = (id) => {
    cancelOrder(id);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: number) => {
    if (!selected || !setSelected) return;

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

  useEffect(() => {
    if (
      openOrders.filter(
        (row) => !!selected && selected.indexOf(row.AppOrderID) !== -1
      ).length === 0
    ) {
      setShowCancelModal(false);
    }
  }, [selected, openOrders]);

  // if (!(openOrders.length > 0)) return null;

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <EnhancedTableToolbar
          heading="Open Orders"
          search={search}
          setSearch={setSearch}
          numOrders={openOrders.length}
        />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              headCells={headCells}
              allowSelection={true}
              numSelected={selected.length}
              onSelectAllClick={(e) => handleSelectAllClick(e, openOrders)}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={openOrders.length}
            />
            <TableBody className="max-h-28 overflow-auto">
              {openOrders.sort(handleSort).map((row, index) => {
                const isDeleteSelected =
                  selectedOption.id === row.AppOrderID.toString() &&
                  selectedOption.type === "delete";
                return (
                  <Fragment key={row.AppOrderID}>
                    <OrderTableRow
                      row={row}
                      index={index}
                      setShowDetails={setShowDetails}
                      allowSelection={true}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      selected={selected}
                      setSelected={setSelected}
                      isDeleteSelected={isDeleteSelected}
                      handleCancel={handleCancel}
                      fetchOrders={fetchOrders}
                    />
                    {isDeleteSelected && (
                      <tr
                        className={`${
                          selectedOption.type === "delete"
                            ? "table-row"
                            : "hidden"
                        } bg-black bg-opacity-[0.04]`}
                      >
                        <td
                          colSpan={8}
                          className={`text-center py-6 border-b border-border`}
                        >
                          <span className="mr-4 text-lg font-medium text-primary">
                            Are you sure you want to cancel {row.TradingSymbol}
                            order?
                          </span>
                          <button
                            onClick={() => handleCancel(row.AppOrderID)}
                            className="mr-4 bg-failure text-white px-3 py-1 rounded-lg text-lg font-medium min-w-[114px]"
                          >
                            Cancel Order
                          </button>
                          <button
                            onClick={() =>
                              setSelectedOption({ type: "", id: "" })
                            }
                            className="text-secondary border border-secondary px-3 py-1 rounded-lg text-lg font-medium min-w-[114px]"
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <div className="flex gap-[10px] mt-[10px]">
        <button
          onClick={() =>
            openOrders.filter(
              (row) => !!selected && selected.indexOf(row.AppOrderID) !== -1
            ).length > 0 && setShowCancelModal(true)
          }
          type="button"
          className={`text-white bg-red-gradient px-2 py-1 rounded-md text-lg font-medium ${
            openOrders.filter(
              (row) => !!selected && selected.indexOf(row.AppOrderID) !== -1
            ).length > 0
              ? ""
              : "cursor-not-allowed"
          }`}
        >
          Cancel Orders
        </button>
        <button className="text-white bg-green-gradient px-2 py-1 rounded-md text-lg font-medium">
          Push to Market
        </button>
      </div>
      <OrderDetailsModal
        setShowDetails={setShowDetails}
        showDetails={showDetails}
      />
      <Modal open={showCancelModal} onClose={() => setShowCancelModal(false)}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-fit min-w-[418px] overflow-hidden">
          <div
            className="bg-neutral-gradient px-10 py-5 flex items-center
            w-full justify-between
          "
          >
            <span className="text-primary text-2xl font-semibold">
              Cancel Orders?
            </span>
          </div>
          <Box sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader>
                <EnhancedTableHead
                  headCells={[
                    {
                      label: "Scrip",
                      className: "pl-10",
                      id: "scrip",
                    },
                    {
                      label: "Quantity",
                      alignment: "right",
                      id: "quantity",
                    },
                    {
                      label: "Price",
                      alignment: "right",
                      id: "price",
                    },
                    {
                      label: "Type",
                      alignment: "right",
                      id: "type",
                    },
                    {
                      label: "Product",
                      alignment: "right",
                      id: "product",
                    },
                    {
                      label: "",
                      id: "remove",
                      className: "pr-10",
                      sort: false,
                    },
                  ]}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={() => {}}
                  rowCount={openOrders.length}
                />
                <TableBody>
                  {openOrders
                    .filter(
                      (row) =>
                        !!selected && selected.indexOf(row.AppOrderID) !== -1
                    )
                    .map((row) => {
                      return (
                        <TableRow id={row.AppOrderID}>
                          <TableCell className="!text-xl !font-medium">
                            <span className="!pl-10 whitespace-nowrap">
                              {row.TradingSymbol}
                            </span>
                          </TableCell>
                          <TableCell
                            className="!text-xl !font-medium"
                            align="right"
                          >
                            {row.OrderQuantity}
                          </TableCell>
                          <TableCell
                            className="!text-xl !font-medium"
                            align="right"
                          >
                            {row.OrderPrice}
                          </TableCell>
                          <TableCell
                            className="!text-xl !font-medium"
                            align="right"
                          >
                            {row.OrderType}
                          </TableCell>
                          <TableCell
                            className="!text-xl !font-medium"
                            align="right"
                          >
                            {row.ProductType}
                          </TableCell>
                          <TableCell
                            className="!text-xl !font-medium"
                            align="right"
                            onClick={(e) => handleClick(e, row.AppOrderID)}
                          >
                            <span className="text-blue cursor-pointer font-medium text-xl !pr-10">
                              Remove
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <div className="flex gap-6 justify-center py-6">
            <button
              onClick={() => setShowCancelModal(false)}
              className="w-[180px] py-2 border rounded-md text-secondary text-2xl font-medium"
            >
              Close
            </button>
            <button
              onClick={handleCancelAll}
              className="w-[180px] py-2 border rounded-md text-white bg-failure text-2xl font-medium"
            >
              Cancel Orders
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
