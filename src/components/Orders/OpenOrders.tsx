import React, { Fragment, useMemo, useState, useEffect, useRef } from "react";

import {
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Menu,
  IconButton,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableHead, HeadCell } from "./EnhancedTableHead";
import { Data, IOrderWithMarketDepth, Order } from "./Orders";
import { deleteOrder } from "../../http/deleteOrder/deleteOrder";
import {
  Cloud,
  DeleteOutline,
  EditOutlined,
  Widgets,
  ContentPaste,
  ContentCopy,
  ContentCut,
  MoreVert,
  CloseOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { visiblityReducer } from "../../features/orderModal/orderModal";
import useModal from "../../hooks/useModal";

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

export default function OpenOrders({ orders, fetchOrders }) {
  const dispatch = useDispatch();
  const [allowSelection, setAllowSelection] = useState(false);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("time");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    type: "",
    id: "",
  });
  const orderOptionsPopupRef = useRef(null);
  const orderOptionsPopupToggleButtonRef = useRef(null);
  // const [showOrderOptions] = useModal(
  //   orderOptionsPopupRef,
  //   orderOptionsPopupToggleButtonRef
  // );
  const [showOrderOptions, setShowOrderOptions] = useState(false);
  const [showDetails, setShowDetails] = useState<IOrderWithMarketDepth | null>(
    null
  );

  // useEffect(() => {
  //   if (showOrderOptions) {
  //     setSelectedOption(() => ({
  //       type: "",
  //       id: "",
  //     }));
  //   }
  // }, [showOrderOptions]);

  const openOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        !!~["New", "Open", "PendingNew"].indexOf(order.OrderStatus) &&
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

  const handleCancelAll = () => {
    selected.map((id) =>
      deleteOrder({ appOrderID: id }).then(() => {
        fetchOrders();
      })
    );
  };

  const handleCancel = (id) => {
    deleteOrder({ appOrderID: id }).then(() => {
      fetchOrders();
    });
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
          heading="Open Orders"
          allowSelection={allowSelection}
          setAllowSelection={setAllowSelection}
          numSelected={selected.length}
          search={search}
          setSearch={setSearch}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              headCells={headCells}
              allowSelection={allowSelection}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(e) => handleSelectAllClick(e, openOrders)}
              onRequestSort={handleRequestSort}
              rowCount={openOrders.length}
            />
            <TableBody className="max-h-28 overflow-auto">
              {openOrders
                .sort(handleSort)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.AppOrderID);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <Fragment key={row.AppOrderID}>
                      <TableRow
                        sx={{
                          "& td":
                            selectedOption.type === "delete"
                              ? { border: 0 }
                              : {},
                        }}
                        className="group"
                        // hover
                        // onClick={(event) => {
                        //   setAllowSelection(true);
                        //   handleClick(event, row.AppOrderID);
                        // }}
                        // onMouseLeave={() =>
                        //   setSelectedOption({ type: "", id: "" })
                        // }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                      >
                        {allowSelection && (
                          <TableCell
                            // className={`${
                            //   selectedOption.type === "delete" && "!border-b-0"
                            // }`}
                            padding="checkbox"
                          >
                            <Checkbox
                              onClick={(event) => {
                                handleClick(event, row.AppOrderID);
                              }}
                              color="secondary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                        )}
                        <TableCell id={labelId} scope="row" padding="none">
                          <span className="text-base">
                            {row.ExchangeTransactTime.split(" ")[1]}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`${
                              row.OrderSide === "BUY"
                                ? "text-success bg-successHighlight"
                                : "text-failure bg-failureHighlight"
                            } text-xs rounded-[4px] py-[5px] px-[6px]`}
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
                            className={`
                            ${
                              (selectedOption.type === "delete" &&
                                selectedOption.id === row.AppOrderID) ||
                              showOrderOptions
                                ? "hidden"
                                : "group-hover:hidden inline"
                            }
                          ${
                            row.ProductType === "MIS" ||
                            row.ProductType === "INTRA"
                              ? "text-purple bg-purpleHighlight"
                              : "text-blue bg-blueHighlight"
                          } text-xs rounded-[4px] py-[5px] px-[6px]`}
                          >
                            {row.ProductType}
                          </span>
                          <div
                            className={`${
                              (selectedOption.type === "delete" &&
                                selectedOption.id === row.AppOrderID) ||
                              showOrderOptions
                                ? "flex"
                                : "group-hover:flex hidden"
                            } gap-2 text-primary`}
                          >
                            <div
                              onClick={() => {
                                setSelectedOption({
                                  type: "edit",
                                  id: row.AppOrderID,
                                });
                                dispatch(
                                  visiblityReducer({
                                    visible: true,
                                    order: {
                                      orderSide: row.OrderSide,
                                      instrument: row,
                                      isModify: true,
                                    },
                                  })
                                );
                              }}
                              className="border border-secondary !w-[28px] !h-[28px] rounded-lg cursor-pointer flex justify-center items-center"
                            >
                              <EditOutlined className="!w-[20px] !h-[20px]" />
                            </div>
                            <div
                              onClick={() =>
                                setSelectedOption({
                                  type: "delete",
                                  id: row.AppOrderID,
                                })
                              }
                              className={`${
                                selectedOption.type === "delete" &&
                                selectedOption.id === row.AppOrderID
                                  ? "border-blue text-blue"
                                  : "border-secondary"
                              } border !w-[28px] !h-[28px] rounded-lg cursor-pointer flex justify-center items-center`}
                            >
                              <DeleteOutline className="!w-[20px] !h-[20px]" />
                            </div>
                            <div
                              ref={orderOptionsPopupToggleButtonRef}
                              onClick={() =>
                                setShowOrderOptions(!showOrderOptions)
                              }
                              className={`${
                                showOrderOptions
                                  ? "border-blue text-blue"
                                  : "border-secondary"
                              } relative border border-secondary !w-[28px] !h-[28px] rounded-lg cursor-pointer flex justify-center items-center`}
                            >
                              <Widgets className="!w-[20px] !h-[20px]" />

                              <Menu
                                id="basic-menu"
                                anchorEl={
                                  orderOptionsPopupToggleButtonRef.current
                                }
                                open={showOrderOptions}
                                onClose={() => setShowOrderOptions(false)}
                                // className={`${
                                //   showOrderOptions ? "block" : "hidden"
                                // } absolute`}
                                // ref={orderOptionsPopupRef}
                                sx={{ width: 320, maxWidth: "100%" }}
                              >
                                <MenuList>
                                  <MenuItem onClick={() => setShowDetails(row)}>
                                    <ListItemIcon>
                                      <MoreVert fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Details</ListItemText>
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-[#a9a9a9] text-base">
                            {row.OrderPrice}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-primary text-base">
                            {row?.Touchline?.LastTradedPrice || 0}
                          </span>
                        </TableCell>
                      </TableRow>
                      {selectedOption.id === row.AppOrderID && (
                        <tr
                          className={`${
                            selectedOption.type === "delete"
                              ? "table-row"
                              : "hidden"
                          }`}
                        >
                          <td
                            colSpan={7}
                            className="text-center py-6 border-b border-border"
                          >
                            <span className="mr-4 text-lg font-medium text-primary">
                              Are you sure you want to cancel SBIN order?
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={openOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <div className="flex gap-[10px]">
        <button
          onClick={handleCancelAll}
          type="button"
          className="text-white bg-red-gradient px-2 py-1 rounded-md text-lg font-medium"
        >
          Cancel Orders
        </button>
        <button className="text-white bg-green-gradient px-2 py-1 rounded-md text-lg font-medium">
          Push to Market
        </button>
      </div>

      <Modal
        open={!!showDetails}
        onClose={() => setShowDetails(null)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[542px] overflow-hidden">
          <div
            className="bg-neutral-gradient p-5 flex items-center
            w-full justify-between
          "
          >
            <div className="flex items-end gap-2 leading-3">
              <span className="font-semibold text-2xl text-primary">
                {showDetails?.TradingSymbol}
              </span>
              <span className="text-xs text-secondary">BSE</span>
              <span
                className={`${
                  showDetails?.OrderSide === "BUY"
                    ? "text-success bg-successHighlight"
                    : "text-failure bg-failureHighlight"
                } text-xs rounded-[4px] py-[5px] px-[6px] font-medium`}
              >
                {showDetails?.OrderSide}
              </span>
              <span
                className={`${
                  true
                    ? "text-success bg-successHighlight"
                    : "text-failure bg-failureHighlight"
                } text-xs rounded-[4px] py-[5px] px-[6px] font-medium`}
              >
                {showDetails?.OrderStatus}
              </span>
            </div>
            <div onClick={() => setShowDetails(null)}>
              <IconButton aria-label="close">
                <CloseOutlined />
              </IconButton>
            </div>
          </div>
          <div
            className="

            flex flex-col gap-2
          px-10 py-6"
          >
            <div
              className="
            flex justify-between"
            >
              <span className="text-sm text-secondary">Qty</span>
              <span className="text-lg text-primary font-medium">
                {showDetails?.OrderQuantity}
              </span>
            </div>
            <div
              className="
            flex justify-between"
            >
              <span className="text-sm text-secondary">Price</span>
              <span className="text-lg text-primary font-medium">
                {showDetails?.OrderPrice}
              </span>
            </div>
            <div
              className="
            flex justify-between"
            >
              <span className="text-sm text-secondary">Avg. Price</span>
              <span className="text-lg text-primary font-medium">
                {showDetails?.AverageTradedPrice}
              </span>
            </div>
            <div
              className="
            flex justify-between"
            >
              <span className="text-sm text-secondary">Trigger Price</span>
              <span className="text-lg text-primary font-medium">
                {showDetails?.OrderStopPrice}
              </span>
            </div>
            <div
              className="
            flex justify-between"
            >
              <span className="text-sm text-secondary">Order Type</span>
              <span className="text-lg text-primary font-medium">
                {showDetails?.OrderType}
              </span>
            </div>
            <div
              className="
            flex justify-between"
            >
              <span className="text-sm text-secondary">Product</span>
              <span className="text-lg text-primary font-medium">
                {showDetails?.ProductType}
              </span>
            </div>
            <div
              className="
            flex justify-between"
            >
              <span className="text-sm text-secondary">Validity</span>
              <span className="text-lg text-primary font-medium">
                {showDetails?.TimeInForce}
              </span>
            </div>
            <div
              className="
            flex justify-between"
            >
              <span className="text-sm text-secondary">Order ID</span>
              <span className="text-lg text-primary font-medium">
                {showDetails?.AppOrderID}
              </span>
            </div>
            <div
              className="
            flex justify-between"
            >
              <span className="text-sm text-secondary">Exchange Order ID</span>
              <span className="text-lg text-primary font-medium">
                {showDetails?.ExchangeOrderID}
              </span>
            </div>
            <div
              className="
            flex justify-between"
            >
              <span className="text-sm text-secondary">Time</span>
              <span className="text-lg text-primary font-medium">
                {showDetails?.OrderGeneratedDateTime}
              </span>
            </div>
            <div
              className="
            flex justify-between"
            >
              <span className="text-sm text-secondary">Exchange Time</span>
              <span className="text-lg text-primary font-medium">
                {showDetails?.ExchangeTransactTime}
              </span>
            </div>
            <div
              className="
            flex justify-between"
            >
              <span className="text-sm text-secondary">Placed by</span>
              <span className="text-lg text-primary font-medium">
                {showDetails?.ClientID}
              </span>
            </div>
            <div className="self-center">
              <button className="m-auto bg-blue text-white rounded-lg px-6 py-2">
                View History
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
