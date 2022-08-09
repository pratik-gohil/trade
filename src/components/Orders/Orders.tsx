import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Search } from "@mui/icons-material";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";

interface Data {
  id: string;
  time: string;
  action: string;
  scrips: string;
  qty: string;
  product: string;
  orderPrice: number;
  ltp: number;
}

interface IOrder {
  LoginID: string;
  ClientID: string;
  AppOrderID: number;
  OrderReferenceID: string;
  GeneratedBy: string;
  ExchangeOrderID: string;
  OrderCategoryType: string;
  ExchangeSegment: string;
  ExchangeInstrumentID: number;
  OrderSide: string;
  OrderType: string;
  ProductType: string;
  TimeInForce: string;
  IsAMO: boolean;
  OrderPrice: number;
  OrderQuantity: number;
  OrderStopPrice: number;
  TradingSymbol: string;
  OrderStatus: string;
  OrderAverageTradedPrice: string;
  LeavesQuantity: number;
  CumulativeQuantity: number;
  OrderDisclosedQuantity: number;
  OrderGeneratedDateTime: string;
  ExchangeTransactTime: string;
  LastUpdateDateTime: string;
  OrderExpiryDate: string;
  CancelRejectReason: string;
  OrderUniqueIdentifier: string;
  OrderLegStatus: string;
  BoLegDetails: number;
  IsSpread: boolean;
  BoEntryOrderId: string;
  MessageCode: number;
  MessageVersion: number;
  TokenID: number;
  ApplicationType: number;
  SequenceNumber: number;
}

function createData(
  id: string,
  time: string,
  action: string,
  scrips: string,
  qty: string,
  product: string,
  orderPrice: number,
  ltp: number
): Data {
  return {
    id,
    time,
    action,
    scrips,
    qty,
    product,
    orderPrice,
    ltp,
  };
}

const rows = [
  {
    ...createData(
      "1",
      "12:25:05",
      "BUY",
      "TECHM",
      "0 / 1000",
      "DEL",
      422.75,
      422.75
    ),
  },
  createData(
    "2",
    "12:25:05",
    "SELL",
    "TECHM",
    "0 / 1000",
    "DEL",
    422.75,
    422.75
  ),
  createData(
    "3",
    "12:25:05",
    "SELL",
    "TECHM",
    "0 / 1000",
    "MIS",
    422.75,
    422.75
  ),
  createData(
    "4",
    "12:25:05",
    "CNC",
    "TECHM",
    "0 / 1000",
    "DEL",
    422.75,
    422.75
  ),
  createData(
    "5",
    "12:25:05",
    "BUY",
    "TECHM",
    "0 / 1000",
    "DEL",
    422.75,
    422.75
  ),
  createData(
    "6",
    "12:25:05",
    "BUY",
    "TECHM",
    "0 / 1000",
    "DEL",
    422.75,
    422.75
  ),
  createData(
    "7",
    "12:25:05",
    "BUY",
    "TECHM",
    "0 / 1000",
    "DEL",
    422.75,
    422.75
  ),
  createData(
    "8",
    "12:25:05",
    "BUY",
    "TECHM",
    "0 / 1000",
    "DEL",
    422.75,
    422.75
  ),
  createData(
    "9",
    "12:25:05",
    "BUY",
    "TECHM",
    "0 / 1000",
    "DEL",
    422.75,
    422.75
  ),
  createData(
    "10",
    "12:25:05",
    "BUY",
    "TECHM",
    "0 / 1000",
    "DEL",
    422.75,
    422.75
  ),
  createData(
    "11",
    "12:25:05",
    "BUY",
    "TECHM",
    "0 / 1000",
    "DEL",
    422.75,
    422.75
  ),
  createData(
    "12",
    "12:25:05",
    "BUY",
    "TECHM",
    "0 / 1000",
    "DEL",
    422.75,
    422.75
  ),
];

type Order = "asc" | "desc";

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
// function stableSort<T>(
//   array: readonly T[],
//   comparator: (a: T, b: T) => number
// ) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

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

interface EnhancedTableProps {
  allowSelection: boolean;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    allowSelection,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  useEffect(() => {
    // const orders = getOrders();
  }, []);

  return (
    <TableHead>
      <TableRow>
        {allowSelection && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  allowSelection: boolean;
  setAllowSelection: Dispatch<SetStateAction<boolean>>;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, allowSelection, setAllowSelection } = props;

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <div className="text-primary text-2xl font-semibold">Open Orders</div>
        <div
          onClick={() => setAllowSelection((prev) => !prev)}
          className={`${
            numSelected
              ? "text-blue border-blue"
              : "text-secondary border-secondary"
          } border rounded px-2 cursor-pointer text-lg font-medium`}
        >
          Select {allowSelection && `(${numSelected})`}
        </div>
      </div>
      <div className="border border-secondary py-1 rounded text-base text-secondary">
        <Search className="text-inherit mx-1.5" fontSize="small" />
        <input
          type="text"
          className="outline-none"
          placeholder="Search in Open Orders"
        />
      </div>
    </div>
  );
};

export function Orders() {
  const [allowSelection, setAllowSelection] = useState(false);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("time");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <div className="p-5">
      {/* <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={allowSelection}
        />
      </div> */}
      <Box sx={{ width: "100%" }}>
        {/* <Paper sx={{ width: "100%", mb: 2 }}> */}
        <EnhancedTableToolbar
          allowSelection={allowSelection}
          setAllowSelection={setAllowSelection}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              allowSelection={allowSelection}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody className="max-h-28 overflow-auto">
              {rows
                .sort()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => {
                        setAllowSelection(true);
                        handleClick(event, row.id);
                      }}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {allowSelection && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
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
                        {row.time}
                      </TableCell>
                      <TableCell align="right">
                        <span
                          className={`${
                            row.action === "BUY"
                              ? "text-success bg-successHighlight"
                              : "text-failure bg-failureHighlight"
                          } text-xs rounded-[4px] py-[5px] px-[6px]`}
                        >
                          {row.action}
                        </span>
                      </TableCell>
                      <TableCell align="right">{row.scrips}</TableCell>
                      <TableCell align="right">
                        <span className="text-secondary">{row.qty}</span>
                      </TableCell>
                      <TableCell align="right">
                        <span
                          className={`${
                            row.product === "MIS" || row.product === "INTRA"
                              ? "text-purple bg-purpleHighlight"
                              : "text-blue bg-blueHighlight"
                          } text-xs rounded-[4px] py-[5px] px-[6px]`}
                        >
                          {row.product}
                        </span>
                      </TableCell>
                      <TableCell align="right">{row.orderPrice}</TableCell>
                      <TableCell align="right">{row.ltp}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* </Paper> */}
      </Box>
      <div className="flex gap-[10px]">
        <button className="text-white bg-red-gradient px-2 py-1 rounded-md text-lg font-medium">
          Cancel Orders
        </button>
        <button className="text-white bg-green-gradient px-2 py-1 rounded-md text-lg font-medium">
          Push to Market
        </button>
      </div>
    </div>
  );
}
