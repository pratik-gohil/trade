import React, { useEffect, useState } from "react";

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
import { getOrders } from "../../http/getOrders/getOrders";

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

type Order = "asc" | "desc";

export function Orders() {
  const [allowSelection, setAllowSelection] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("time");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    (async () => {
      const response = await getOrders();
      if (response.type === "success") {
        setOrders(response.result);
      }
    })();
  }, []);

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
          <Table sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              allowSelection={allowSelection}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={orders.length}
            />
            <TableBody className="max-h-28 overflow-auto">
              {orders
                .sort()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.AppOrderID);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => {
                        setAllowSelection(true);
                        handleClick(event, row.AppOrderID);
                      }}
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
                          {row.ExchangeTransactTime}
                        </span>
                      </TableCell>
                      <TableCell align="right">
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
                      <TableCell align="right">
                        <span className="text-base text-primary">
                          {row.TradingSymbol}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span className="text-[#a9a9a9] text-base">NA</span>
                      </TableCell>
                      <TableCell align="right">
                        <span
                        // className={`${
                        //   row.product === "MIS" || row.product === "INTRA"
                        //     ? "text-purple bg-purpleHighlight"
                        //     : "text-blue bg-blueHighlight"
                        // } text-xs rounded-[4px] py-[5px] px-[6px]`}
                        >
                          NA
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span className="text-primary text-base">NA</span>
                      </TableCell>
                      <TableCell align="right">
                        <span className="text-primary text-base">
                          {row.OrderPrice}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
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
