import React, { useState, useEffect, useContext } from "react";

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
import { SocketContext } from "../../socket";
import { toFixedN } from "../../utils/toFixedN";
import { percDiff } from "../../utils/percentageDiffrence";
import { formatCurrency } from "../../utils/formatCurrency";

const headCells: readonly HeadCell[] = [
  {
    id: "scrips",
    label: "Scrips",
  },
  {
    id: "qty",
    alignment: "center",
    label: "Qty",
  },
  {
    id: "avgPrice",
    alignment: "right",
    label: "Avg Price",
  },
  {
    id: "ltp",
    alignment: "center",
    label: "LTP",
  },
  {
    id: "current",
    alignment: "center",
    label: "Current",
  },
  {
    id: "p&l",
    alignment: "center",
    label: "P&L",
  },
  {
    id: "netChg",
    alignment: "right",
    label: "Net Chg",
  },
  {
    id: "perChg",
    alignment: "right",
    label: "% Chg",
  },
];

function Holdings() {
  const [holdings, setHoldings] = useState<any>([]);
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<any>("scrips");
  const [investment, setInvestment] = useState(0);
  const [current, setCurrent] = useState(0);
  const [dayPnL, setDayPnL] = useState(0);
  const [overallPnL, setOverallPnL] = useState(0);
  const { socket } = useContext(SocketContext) as { socket: any };

  useEffect(() => {
    getHoldings().then((res) => {
      const instruments = res.result.holdingsList.map((holding) => ({
        exchangeSegment: 1,
        exchangeInstrumentID: holding.ExchangeNSEInstrumentId,
      }));

      subscribeInstruments({ instruments, xtsMessageCode: 1512 });

      setHoldings(res.result.holdingsList);
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

  useEffect(() => {
    let investment = 0;
    holdings.forEach((holding) => {
      investment += holding.BuyAvgPrice * holding.HoldingQuantity;
    });

    setInvestment(investment);
  }, [holdings]);

  const handleRequestSort = () => {};

  return (
    <>
      <div className="p-5">
        <h1
          className="mb-6 text-2xl font-semibold
        "
        >
          Holdings
        </h1>
        <div className="bg-successHighlight flex justify-between px-6 py-3 rounded">
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
        <Box sx={{ width: "100%" }}>
          <TableContainer>
            <Table>
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
                {holdings?.map((holding, index) => {
                  const invested =
                    holding.BuyAvgPrice * holding.HoldingQuantity;
                  const current =
                    holding.HoldingQuantity * holding.LastTradedPrice;
                  return (
                    <TableRow tabIndex={-1} key={index.toString()}>
                      <TableCell>NA</TableCell>
                      <TableCell align="center">
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
                      <TableCell align="center">
                        {toFixedN(holding.LastTradedPrice)}
                      </TableCell>
                      {/* <TableCell>{toFixedN(invested)}</TableCell> */}
                      <TableCell align="center">{toFixedN(current)}</TableCell>
                      <TableCell align="center">
                        <span
                          className={`${
                            Number(percDiff(current, invested)) > 0
                              ? "text-success"
                              : "text-failure"
                          }`}
                        >
                          {(Number(toFixedN(current - invested)) > 0
                            ? "+"
                            : "") + toFixedN(current - invested)}
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

export default Holdings;
