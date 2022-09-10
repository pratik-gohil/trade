import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Search } from "@mui/icons-material";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { getNetPositions } from "../../http/getNetPositions/getNetPositions";
import { EnhancedTableHead, HeadCell } from "../Orders/EnhancedTableHead";
import { subscribeInstruments } from "../../http/subscribeInstruments/subscribeInstruments";
import { unsubscribeInstruments } from "../../http/unsubscribeInstruments/unsubscribeInstruments";
import { Segments } from "../../types/enums/segment.enums.types";
import { SocketContext } from "../../socket";
import { Touchline } from "../../types/interfaces/marketDepth.interfaces.types";
import { toFixedN } from "../../utils/toFixedN";
import { positions } from "@mui/system";

type Order = "asc" | "desc";

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
    label: "Avg Price",
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
    label: "MTM",
  },

  {
    id: "perChg",
    numeric: true,
    disablePadding: false,
    label: "% Chg",
  },
];

interface EnhancedTableToolbarProps {
  numSelected: number;
  allowSelection: boolean;
  setAllowSelection: Dispatch<SetStateAction<boolean>>;
  filter: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  PandL: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const {
    numSelected,
    allowSelection,
    setAllowSelection,
    filter,
    search,
    setSearch,
    PandL,
  } = props;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-green-50 flex items-center p-2 text-xl gap-4 rounded-[4px]">
        {filter} P&L{" "}
        <span className="text-4xl text-success font-medium">
          {(PandL >= 0 ? "+" : "-") + toFixedN(PandL, 2)}
        </span>
      </div>
    </div>
  );
};
interface IPosition {
  AccountID: string;
  TradingSymbol: string;
  ExchangeSegment: string;
  ExchangeInstrumentId: string;
  ProductType: string;
  Marketlot: string;
  Multiplier: string;
  BuyAveragePrice: string;
  SellAveragePrice: string;
  OpenBuyQuantity: string;
  OpenSellQuantity: string;
  Quantity: string;
  BuyAmount: string;
  SellAmount: string;
  NetAmount: string;
  UnrealizedMTM: string;
  RealizedMTM: string;
  MTM: string;
  BEP: string;
  SumOfTradedQuantityAndPriceBuy: string;
  SumOfTradedQuantityAndPriceSell: string;
  StatisticsLevel: string;
  IsInterOpPosition: boolean;
  childPositions: ChildPosition[];
  MessageCode: number;
  MessageVersion: number;
  TokenID: number;
  ApplicationType: number;
  SequenceNumber: number;
  AverageTradedPrice: number;
  LastTradedPrice: number;
}

interface IPositionWithTouchline extends IPosition {
  Touchline: Touchline;
}

interface ChildPosition {
  AccountID: string;
  TradingSymbol: string;
  ExchangeSegment: string;
  ExchangeInstrumentId: string;
  ProductType: string;
  Marketlot: string;
  Multiplier: string;
  BuyAveragePrice: string;
  SellAveragePrice: string;
  OpenBuyQuantity: string;
  OpenSellQuantity: string;
  Quantity: string;
  BuyAmount: string;
  SellAmount: string;
  NetAmount: string;
  UnrealizedMTM: string;
  RealizedMTM: string;
  MTM: string;
  BEP: string;
  SumOfTradedQuantityAndPriceBuy: string;
  SumOfTradedQuantityAndPriceSell: string;
  StatisticsLevel: string;
  IsInterOpPosition: boolean;
}

export function Positions() {
  const [allowSelection, setAllowSelection] = useState(false);
  const [netPositions, setNetPositions] = useState<IPositionWithTouchline[]>(
    []
  );
  console.log("", netPositions);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>("scrips");
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const [search, setSearch] = useState("");
  const { socket } = useContext(SocketContext) as { socket: any };
  const [PandL, setPandL] = useState(0);

  const filteredNetPositions = useMemo(() => {
    return netPositions.filter((p) =>
      p.TradingSymbol.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search, netPositions]);

  useEffect(() => {
    let orderIds;
    getNetPositions().then((res) => {
      if (res.type === "success") {
        setNetPositions(res.result.positionList);
        orderIds = netPositions.map((position) => ({
          exchangeSegment: Segments[position.ExchangeSegment],
          exchangeInstrumentID: position.ExchangeInstrumentId,
        }));
        subscribeInstruments({ instruments: orderIds });
      }
    });

    return () => {
      unsubscribeInstruments({ instruments: orderIds });
    };
  }, []);

  useEffect(() => {
    const listener = (res) => {
      const data = JSON.parse(res);
      setNetPositions((positions) => {
        return positions.map((position) =>
          position.ExchangeInstrumentId.toString() ===
          data.ExchangeInstrumentID.toString()
            ? { ...position, ...data }
            : position
        );
      });

      if (data.LastTradedPrice) {
        setPandL((PandL) => PandL + data.LastTradedPrice);
      }
    };
    socket.on("1501-json-full", listener);

    return () => {
      socket.off("1501-json-full", listener);
    };
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = filteredNetPositions.map((n, i) => i.toString());
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const [filterType, setFilterType] = useState("All");
  const filters = [
    { name: "All", filter: "All" },
    { name: "Open", filter: "Open" },
    { name: "Close", filter: "Close" },
    { name: "Today's trades", filter: "Today's" },
    { name: "TradeBox", filter: "TradeBox" },
  ];

  const handleSort = (a, b) => {
    let key;
    switch (orderBy) {
      case "scrips":
        key = "TradingSymbol";
        break;
      case "qty":
        key = "Quantity";
        break;
      case "product":
        key = "ProductType";
        break;
      case "avgPrice":
        key = "BuyAveragePrice";
        break;
      case "ltp":
        key = "LastTradedPrice";
        break;
      case "mtm":
        key = "MTM";
        break;
      case "perChg":
        key = "";
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
    <>
      <div className="p-5 h-full">
        <Box sx={{ width: "100%" }}>
          <EnhancedTableToolbar
            search={search}
            setSearch={setSearch}
            filter={filterType}
            allowSelection={allowSelection}
            setAllowSelection={setAllowSelection}
            numSelected={selected.length}
            PandL={PandL}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                headCells={headCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={filteredNetPositions.length}
                allowSelection={allowSelection}
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody className="max-h-28 overflow-auto">
                {filteredNetPositions
                  .sort(handleSort)
                  //
                  .map((row, index) => {
                    const isItemSelected = isSelected(index.toString());
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        // hover
                        onClick={(event) => {
                          setAllowSelection(true);
                          handleClick(event, index.toString());
                        }}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index.toString()}
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
                          {row.TradingSymbol}
                        </TableCell>
                        <TableCell>{row.Quantity}</TableCell>
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
                        <TableCell>{row.BuyAveragePrice}</TableCell>
                        <TableCell>{row.LastTradedPrice || 0}</TableCell>
                        <TableCell>
                          {toFixedN(
                            row.LastTradedPrice -
                              row.AverageTradedPrice * Number(row.Quantity),
                            2
                          )}
                        </TableCell>
                        <TableCell>
                          {row.LastTradedPrice
                            ? toFixedN(
                                ((Number(row.BuyAveragePrice) -
                                  (row.LastTradedPrice || 0)) /
                                  (row.LastTradedPrice || 0)) *
                                  100,
                                2
                              )
                            : 0}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
      <div className="sticky flex gap-4 bottom-0 w-full border-t px-5 py-2 bg-white">
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
