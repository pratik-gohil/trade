import React, { useState } from "react";
import { Search } from "@mui/icons-material";

import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
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
    "BUY",
    "TECHM",
    "0 / 1000",
    "DEL",
    422.75,
    422.75
  ),
  createData(
    "3",
    "12:25:05",
    "BUY",
    "TECHM",
    "0 / 1000",
    "DEL",
    422.75,
    422.75
  ),
  createData(
    "4",
    "12:25:05",
    "BUY",
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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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
  setAllowSelection: any;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, setAllowSelection } = props;

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
          Select ({numSelected})
        </div>
      </div>
      <div className="border border-secondary p-1 rounded text-base text-secondary">
        <Search className="text-inherit text-sm mr-2" />
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
                      <TableCell align="right">{row.action}</TableCell>
                      <TableCell align="right">{row.scrips}</TableCell>
                      <TableCell align="right">{row.qty}</TableCell>
                      <TableCell align="right">{row.product}</TableCell>
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
