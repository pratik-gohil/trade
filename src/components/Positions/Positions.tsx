import React, { Dispatch, SetStateAction, useState } from "react";
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
  scrips: string;
  qty: string;
  product: string;
  avgPrice: number;
  ltp: number;
  mtm: string;
  perChg: string;
}

function createData(
  id: string,
  scrips: string,
  qty: string,
  product: string,
  avgPrice: number,
  ltp: number,
  mtm: string,
  perChg: string
): Data {
  return {
    id,
    scrips,
    qty,
    product,
    avgPrice,
    ltp,
    mtm,
    perChg,
  };
}

const rows = [
  createData(
    "1",
    "TECHM",
    "1000",
    "DEL",
    422.75,
    422.75,
    "+9,00,000.0",
    "3.1%"
  ),
  createData(
    "2",
    "TECHM",
    "1000",
    "DEL",
    422.75,
    422.75,
    "+9,00,000.0",
    "3.1%"
  ),
  createData(
    "3",
    "TECHM",
    "1000",
    "DEL",
    422.75,
    422.75,
    "+9,00,000.0",
    "3.1%"
  ),
  createData(
    "4",
    "TECHM",
    "1000",
    "DEL",
    422.75,
    422.75,
    "+9,00,000.0",
    "3.1%"
  ),
  createData(
    "5",
    "TECHM",
    "1000",
    "DEL",
    422.75,
    422.75,
    "+9,00,000.0",
    "3.1%"
  ),
  createData(
    "6",
    "TECHM",
    "1000",
    "DEL",
    422.75,
    422.75,
    "+9,00,000.0",
    "3.1%"
  ),
  createData(
    "7",
    "TECHM",
    "1000",
    "DEL",
    422.75,
    422.75,
    "+9,00,000.0",
    "3.1%"
  ),
  createData(
    "8",
    "TECHM",
    "1000",
    "DEL",
    422.75,
    422.75,
    "+9,00,000.0",
    "3.1%"
  ),
  createData(
    "9",
    "TECHM",
    "1000",
    "DEL",
    422.75,
    422.75,
    "+9,00,000.0",
    "3.1%"
  ),
  createData(
    "10",
    "TECHM",
    "1000",
    "DEL",
    422.75,
    422.75,
    "+9,00,000.0",
    "3.1%"
  ),
  createData(
    "11",
    "TECHM",
    "1000",
    "DEL",
    422.75,
    422.75,
    "+9,00,000.0",
    "3.1%"
  ),
  createData(
    "12",
    "TECHM",
    "1000",
    "DEL",
    422.75,
    422.75,
    "+9,00,000.0",
    "3.1%"
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
    id: "scrips",
    numeric: false,
    disablePadding: true,
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
    id: "avgPrice",
    numeric: false,
    disablePadding: true,
    label: "Time",
  },
  {
    id: "ltp",
    numeric: true,
    disablePadding: false,
    label: "LTP",
  },
  {
    id: "mtm",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },

  {
    id: "perChg",
    numeric: true,
    disablePadding: false,
    label: "Order Price",
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
  allowSelection: boolean;
  setAllowSelection: Dispatch<SetStateAction<boolean>>;
  filter: string;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, allowSelection, setAllowSelection, filter } = props;

  return (
    <div className="flex justify-between items-stretch mb-6">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-primary text-2xl font-semibold">
            {filter} Positions
          </div>
          <div className="flex items-center gap-4">
            {filter !== "Close" && (
              <div
                onClick={() => setAllowSelection((prev) => !prev)}
                className={`${
                  numSelected
                    ? "text-blue border-blue"
                    : "text-secondary border-secondary"
                } border rounded px-2 py-0.5 cursor-pointer text-base font-medium flex items-center`}
              >
                Select {allowSelection && `(${numSelected})`}
              </div>
            )}
            <div className="border border-secondary py-1 rounded text-base text-secondary">
              <Search className="text-inherit mx-1.5" fontSize="small" />
              <input
                type="text"
                className="outline-none"
                placeholder="Search in Positions"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-green-50 flex items-center p-2 text-xl gap-4 rounded-[4px]">
        {filter} P&L{" "}
        <span className="text-3xl text-success font-medium">+9,79,817.70</span>
      </div>
    </div>
  );
};

export function Positions() {
  const [allowSelection, setAllowSelection] = useState(false);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("scrips");
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

  const [filterType, setFilterType] = useState("All");
  const filters = [
    { name: "All", filter: "All" },
    { name: "Open", filter: "Open" },
    { name: "Close", filter: "Close" },
    { name: "Today's trades", filter: "Today's" },
    { name: "TradeBox", filter: "TradeBox" },
  ];

  return (
    <>
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
            filter={filterType}
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
                          {row.scrips}
                        </TableCell>
                        <TableCell align="right">{row.qty}</TableCell>
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
                        <TableCell align="right">{row.avgPrice}</TableCell>
                        <TableCell align="right">{row.ltp}</TableCell>
                        <TableCell align="right">{row.mtm}</TableCell>
                        <TableCell align="right">{row.perChg}</TableCell>
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
      </div>
      <div className="fixed flex gap-4 bottom-0 w-full border-t px-5 py-2 bg-white">
        {filters.map((filter) => (
          <div
            key={filter.name}
            className={`${
              filter.filter === filterType ? "selected-tab" : "text-secondary"
            } py-1 px-2 rounded cursor-pointer text-lg`}
            onClick={() => setFilterType(filter.filter)}
          >
            {filter.name}
          </div>
        ))}
      </div>
    </>
  );
}
