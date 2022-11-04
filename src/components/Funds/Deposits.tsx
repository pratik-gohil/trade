import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getDeposits } from "../../http/funds/deposits";
import DatePicker from "../DatePicker/DatePicker";

interface IDeposit {
  COCD: string;
  DR_AMT: number;
  CR_AMT: number;
  VOUCHERDATE: string;
  SETTLEMENT_NO: string;
  CTRCODE: string;
  CTRNAME: string;
  TRANS_TYPE: string;
  VOUCHERNO: string;
  NARRATION: string;
  BILLNO: string;
  CONAME: string;
  CHQNO: number;
  EXPECTED_DATE: string;
  TRADING_COCD: string;
  PANNO: string;
  EMAIL: string;
  MANUALVNO: string;
  BOOKTYPECODE: number;
  BILL_DATE: string;
  MKT_TYPE: string;
  GROUPCODE: string;
  KINDOFACCOUNT: string;
  BRSFLAG: string;
  SETL_PAYINDATE: string;
  LAST2SETL: string;
  ACCOUNTCODE1: string;
  GATEWAYID: string;
  PUNCH_TIME: string;
  VOCTYPE: number;
  CHQIMAGEPATH: string;
  CONTRACTNO: string;
  TRANS_TYPE1: string;
  ACCOUNTCODE: string;
  LAST_PAYMENT: string;
  LAST_RECEIPT: string;
  ACCOUNTNAME: string;
  TELNO: string;
  FAX: string;
  ADDR: string;
  OPENINGBALANCE: number;
}

function Deposits() {
  const [dateRange, setDateRange] = useState<(string | string)[]>(["", ""]);

  const mapData = (columns, data) =>
    data.map((row) =>
      row.reduce((acc, cell, i) => ({ ...acc, [columns[i]]: cell }), {})
    );

  const cols = ["Date", "Segment", "Amount", "Balance", "Description"];
  const [d, setD] = useState<IDeposit[]>([]);

  useEffect(() => {
    const [from, to] = dateRange;
    if (from && to) {
      getDeposits({
        from: new Date(from).toLocaleDateString("en-IN"),
        to: new Date(to).toLocaleDateString("en-IN"),
      }).then((res) => {
        const { COLUMNS, DATA } = res[0];
        setD(mapData(COLUMNS, DATA));
      });
    }
  }, [dateRange]);

  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-primary font-semibold text-2xl">Recent Deposits</h1>
      <div>
        <DatePicker onChange={(range) => setDateRange(range)} />
      </div>
      <Box sx={{ width: "100%" }}>
        <TableContainer>
          <Table>
            <TableHead>
              {cols.map((col) => (
                <TableCell>
                  <span className="text-xs text-primary">{col}</span>
                </TableCell>
              ))}
            </TableHead>
            <TableBody
              sx={{ minWidth: 750 }}
              className="max-h-28 overflow-auto"
            >
              {d.map((row) => (
                <TableRow>
                  <TableCell>
                    <span className="text-base text-primary">
                      {row.BILL_DATE
                        ? new Date(row.BILL_DATE).toLocaleDateString()
                        : "NA"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-base text-primary">{row.COCD}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-base text-primary">
                      {row.OPENINGBALANCE}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-base text-primary">{row.DR_AMT}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-base text-primary">
                      {row.NARRATION}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default Deposits;
