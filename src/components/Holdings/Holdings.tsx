import React, { useState, useEffect, useContext, useRef } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { EnhancedTableHead, HeadCell } from "../Orders/EnhancedTableHead";
import { Order } from "../Orders";
import { getHoldings } from "../../http/holdings/getHoldings";
import { subscribeInstruments } from "../../http/subscribeInstruments/subscribeInstruments";
import { SocketContext } from "../../contexts/socket";
import { toFixedN } from "../../utils/toFixedN";
import { percDiff } from "../../utils/percentageDiffrence";
import { formatCurrency } from "../../utils/formatCurrency";
import { searchInstruments } from "../../http/searchInstruments/searchInstruments";
import { Segments, Series } from "../../types/enums/segment.enums.types";
import {
  AccessAlarm,
  CandlestickChartOutlined,
  Description,
  Menu as MenuIcon,
  MoreVert,
  NotificationsOutlined,
  PictureAsPdf,
  Search,
} from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem, MenuList } from "@mui/material";
import { CustomListItemText } from "../Orders/OrderTableRow";
import { visiblityReducer } from "../../features/orderModal/orderModal";
import { useDispatch } from "react-redux";

const headCells: readonly HeadCell[] = [
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
    id: "avgPrice",
    alignment: "right",
    label: "Avg Price",
  },
  {
    id: "ltp",
    alignment: "right",
    label: "LTP",
  },
  {
    id: "current",
    alignment: "right",
    label: "Current",
  },
  {
    id: "p&l",
    alignment: "right",
    label: "P&L",
  },
  {
    id: "netChg",
    alignment: "right",
    label: "Net Chg",
  },
  {
    id: "dayChg",
    alignment: "right",
    label: "Day Chg",
  },
];

export function Holdings() {
  const [holdings, setHoldings] = useState<any>([]);
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<any>("scrips");
  const [investment, setInvestment] = useState(0);
  const [current, setCurrent] = useState(0);
  const [dayPnL, setDayPnL] = useState(0);
  const [overallPnL, setOverallPnL] = useState(0);
  const [search, setSearch] = useState("");
  const { socket } = useContext(SocketContext) as { socket: any };
  const csvLink = useRef<HTMLAnchorElement | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const toggleShowShowOptions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let str =
      "Name,Quantity,Average Price,Last Traded Price,Current,P&L,Net Change,Day Change\r\n";

    for (let i = 0; i < holdings.length; i++) {
      let line = new Array();

      let keys = [
        "DisplayName",
        "HoldingQuantity",
        "BuyAvgPrice",
        "LastTradedPrice",
      ];

      keys.map((k) => {
        line.push(holdings[i][k]);
      });

      str += line.join(",");
      str += "\r\n";
    }

    const file = new Blob([str], { type: "text/csv" });

    if (csvLink.current) {
      csvLink.current.href = URL.createObjectURL(file);

      csvLink.current.download = "holdings.csv";
    }
  }, [holdings]);

  useEffect(() => {
    getHoldings().then(async (res) => {
      const instruments = res.result.holdingsList.map((holding) => ({
        exchangeSegment: 1,
        exchangeInstrumentID: holding.ExchangeNSEInstrumentId,
      }));

      subscribeInstruments({ instruments, xtsMessageCode: 1512 });

      const holdingInstrumentInfo = await searchInstruments(instruments);

      const populatedHoldings = res.result.holdingsList.map((holding) => {
        const info = holdingInstrumentInfo.result.find(
          (i) => i.ExchangeInstrumentID === holding.ExchangeNSEInstrumentId
        );
        return { ...holding, ...info };
      });

      setHoldings(populatedHoldings);
    });
  }, []);

  useEffect(() => {
    const listener = (res) => {
      const data = JSON.parse(res);
      setHoldings((instruments) =>
        instruments.map((instrument) => {
          return instrument.ExchangeNSEInstrumentId ===
            data.ExchangeInstrumentID
            ? { ...instrument, ...data }
            : instrument;
        })
      );
    };
    socket.on("1512-json-full", listener);
  }, []);

  useEffect(() => {
    let current = 0;
    let dayPnL = 0;
    let overallPnL = 0;
    holdings.forEach((holding) => {
      current += holding.HoldingQuantity * holding.LastTradedPrice;

      dayPnL +=
        holding.HoldingQuantity * (holding.LastTradedPrice - holding.Close);

      overallPnL +=
        holding.HoldingQuantity *
        (holding.LastTradedPrice - holding.BuyAvgPrice);
    });
    setCurrent(Number(toFixedN(current)));
    setDayPnL(Number(toFixedN(dayPnL)));
    setOverallPnL(Number(toFixedN(overallPnL)));
  }, [holdings]);

  //  id: "scrips",
  //   id: "qty",
  //   id: "avgPrice",
  //   id: "ltp",
  //   id: "current",
  //   id: "p&l",
  //   id: "netChg",
  //   id: "dayChg",
  const handleSort = (a, b) => {
    let key;
    switch (orderBy) {
      case "scrips":
        key = "DisplayName";
        break;
      case "qty":
        key = "HoldingQuantity";
        break;
      case "avgPrice":
        key = "BuyAvgPrice";
        break;
      case "ltp":
        key = "LastTradedPrice";
        break;
      case "current":
        key = "current";
        break;
      case "pnl":
        key = "pnl";
        break;
      case "netChg":
        key = "netChg";
        break;
      case "dayChg":
        key = "dayChg";
        break;
      default:
        key = undefined;
    }

    if (key !== undefined) {
      if (key === "")
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
    let investment = 0;
    holdings.forEach((holding) => {
      investment += holding.BuyAvgPrice * holding.HoldingQuantity;
    });

    setInvestment(investment);
  }, [holdings]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <div className="p-5">
        <h1
          className="mb-6 text-2xl font-semibold
        "
        >
          Equity Portfolio ({holdings.length})
        </h1>
        <div
          className={`${
            overallPnL > 0 ? "bg-successHighlight" : "bg-failureHighlight"
          } flex justify-between px-6 py-3 rounded`}
        >
          <div className="text-center">
            <h3 className="text-lg font-light">Investment</h3>
            <h1 className="text-4xl">{formatCurrency(investment)}</h1>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-light">Current</h3>
            <h1 className="text-4xl">{formatCurrency(current)}</h1>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-light">Day's P&L</h3>
            <h1
              className={`text-4xl ${
                dayPnL > 0 ? "text-success" : "text-failure"
              }`}
            >
              {formatCurrency(dayPnL)}
            </h1>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-light">Overall P&L</h3>
            <h1
              className={`text-4xl ${
                overallPnL > 0 ? "text-success" : "text-failure"
              }`}
            >
              {formatCurrency(overallPnL)}
            </h1>
          </div>
        </div>
        <div className="flex justify-between items-end py-5">
          <div className="border border-secondary py-1 rounded text-base text-secondary">
            <Search className="text-inherit mx-1.5" fontSize="small" />
            <input
              type="text"
              className="outline-none"
              placeholder="Search in Holdings"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-5">
            <span className="text-blue text-base underline">
              Detailed Holdings
            </span>
            <span className="text-blue text-base underline">Authorization</span>
            <PictureAsPdf />

            <a ref={csvLink}>
              <Description />
            </a>
          </div>
        </div>
        <Box sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: 350 }}>
            <Table stickyHeader>
              <EnhancedTableHead
                headCells={headCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={holdings?.length}
              />
              <TableBody
                sx={{ minWidth: 750 }}
                className="max-h-28 overflow-auto"
              >
                {holdings
                  ?.sort(handleSort)
                  .filter((holding) =>
                    holding.DisplayName.includes(search.toUpperCase())
                  )
                  .map((holding, index) => {
                    const invested =
                      holding.BuyAvgPrice * holding.HoldingQuantity;
                    const current =
                      holding.HoldingQuantity * holding.LastTradedPrice;
                    return (
                      <TableRow tabIndex={-1} key={index.toString()} hover>
                        <TableCell className="border-r relative group">
                          {holding.DisplayName}
                          <span className="text-xxxs text-secondary ml-[6px]">
                            {Segments[holding.ExchangeSegment] === "NSECM" ||
                            Segments[holding.ExchangeSegment] === "BSECM"
                              ? Series[Segments[holding.ExchangeSegment]]
                              : Series[holding.Series] || holding.Series}
                          </span>

                          <span
                            id={holding.ExchangeInstrumentID}
                            onClick={(e) => {
                              toggleShowShowOptions(e);
                            }}
                            className="bg-white border text-primary absolute right-3 invisible group-hover:visible cursor-pointer w-5 h-5 inline-flex justify-center items-center rounded"
                          >
                            <MenuIcon fontSize="inherit" />
                          </span>

                          <Menu
                            anchorEl={anchorEl}
                            open={holding.ExchangeInstrumentID == anchorEl?.id}
                            onClose={() => {
                              setAnchorEl(null);
                            }}
                            sx={{ width: 320, maxWidth: "100%" }}
                          >
                            <MenuList>
                              <MenuItem
                                onClick={() => {
                                  dispatch(
                                    visiblityReducer({
                                      visible: true,
                                      order: {
                                        orderSide: "BUY",
                                        instrument: {
                                          exchangeInstrumentID:
                                            holding.ExchangeInstrumentID,
                                          exchangeSegment:
                                            holding.ExchangeSegment,
                                        },
                                      },
                                    })
                                  );

                                  setAnchorEl(null);
                                }}
                              >
                                <ListItemIcon>B</ListItemIcon>
                                <CustomListItemText>Add</CustomListItemText>
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  dispatch(
                                    visiblityReducer({
                                      visible: true,
                                      order: {
                                        orderSide: "SELL",
                                        instrument: {
                                          exchangeInstrumentID:
                                            holding.ExchangeInstrumentID,
                                          exchangeSegment:
                                            holding.ExchangeSegment,
                                        },
                                      },
                                    })
                                  );

                                  setAnchorEl(null);
                                }}
                              >
                                <ListItemIcon>S</ListItemIcon>
                                <CustomListItemText>Exit</CustomListItemText>
                              </MenuItem>
                              <MenuItem>
                                <ListItemIcon>
                                  <MoreVert fontSize="small" />
                                </ListItemIcon>
                                <CustomListItemText>
                                  View Breakdown
                                </CustomListItemText>
                              </MenuItem>
                              <MenuItem>
                                <ListItemIcon>
                                  <AccessAlarm fontSize="small" />
                                </ListItemIcon>
                                <CustomListItemText>
                                  Create GTT
                                </CustomListItemText>
                              </MenuItem>
                              <MenuItem>
                                <ListItemIcon>
                                  <NotificationsOutlined fontSize="small" />
                                </ListItemIcon>
                                <CustomListItemText>
                                  Create Alert
                                </CustomListItemText>
                              </MenuItem>
                              <MenuItem>
                                <ListItemIcon>5</ListItemIcon>
                                <CustomListItemText>
                                  Market Depth
                                </CustomListItemText>
                              </MenuItem>
                              <MenuItem>
                                <ListItemIcon>
                                  <CandlestickChartOutlined fontSize="small" />
                                </ListItemIcon>
                                <CustomListItemText>
                                  Stock Profile
                                </CustomListItemText>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </TableCell>
                        <TableCell align="right">
                          {holding.HoldingQuantity}
                        </TableCell>
                        {/* <TableCell>
                        {toFixedN(
                          (Date.now() -
                            (new Date(holding.LastUpdateTime * 1000) as any)) /
                            (1000 * 60 * 60 * 24)
                        )}
                      </TableCell> */}
                        <TableCell align="right">
                          {toFixedN(holding.BuyAvgPrice)}
                        </TableCell>
                        <TableCell align="right">
                          {toFixedN(holding.LastTradedPrice)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(current)}
                        </TableCell>
                        <TableCell align="right">
                          <span
                            className={`${
                              Number(percDiff(current, invested)) > 0
                                ? "text-success"
                                : "text-failure"
                            }`}
                          >
                            {(Number(toFixedN(current - invested)) > 0
                              ? "+"
                              : "") + formatCurrency(current - invested)}
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          <span
                            className={`${
                              Number(percDiff(current, invested)) > 0
                                ? "text-success"
                                : "text-failure"
                            }`}
                          >
                            {percDiff(current, invested)}%
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          <span
                            className={`${
                              Number(
                                percDiff(holding.LastTradedPrice, invested)
                              ) > 0
                                ? "text-success"
                                : "text-failure"
                            }`}
                          >
                            {percDiff(holding.LastTradedPrice, invested)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </>
  );
}
