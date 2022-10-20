import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { RootState } from "../../app/store";
import { Orders } from "../Orders";
import { Positions } from "../Positions";
import { TVChartContainer } from "../TVChartContainer";
import { WatchList } from "../WatchList";
import Home from "../Home/Home";
import News from "../Home/News";
import BulkBlock from "../Home/BulkBlock";
import InsiderTrades from "../Home/InsiderTrades";
import Funds from "../Funds/Funds";
import Fundamentals from "../Home/Fundamentals";
import Overview from "../Home/Fundamentals/Overview";
import Quarterly from "../Home/Fundamentals/Quarterly";
import Annual from "../Home/Fundamentals/Annual";
import BalanceSheet from "../Home/Fundamentals/BalanceSheet";
import Ratios from "../Home/Fundamentals/Ratios";
import ShareHolding from "../Home/Fundamentals/ShareHolding";
import Peers from "../Home/Fundamentals/Peers";
import CashFlow from "../Home/Fundamentals/CashFlow";

export function Main() {
  const instrument = useSelector((state: RootState) => state.tvc.instrument);

  return (
    <div className="flex">
      <WatchList />
      <div className="w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-y-auto">
        <Routes>
          <Route path="home" element={<Home instrument={instrument} />}>
            <Route
              path="chart"
              element={<TVChartContainer instrument={instrument} />}
            />
            <Route path="fundamentals" element={<Fundamentals />}>
              <Route path="overview" element={<Overview />} />
              <Route path="quarterly" element={<Quarterly />} />
              <Route path="annual" element={<Annual />} />
              <Route path="cash_flow" element={<CashFlow />} />
              <Route path="balance_sheet" element={<BalanceSheet />} />
              <Route path="ratios" element={<Ratios />} />
              <Route path="shareholding" element={<ShareHolding />} />
              <Route path="peers" element={<Peers />} />
            </Route>
            <Route path="news" element={<News instrument={instrument} />} />
            <Route
              path="bulk%20&%20block%20deals"
              element={<BulkBlock instrument={instrument} />}
            />
            <Route
              path="insider%20trades"
              element={<InsiderTrades instrument={instrument} />}
            />
          </Route>
          <Route
            path="/markets"
            element={
              <div className="p-5" style={{ width: "100%", height: "100%" }}>
                Market
              </div>
            }
          />
          <Route
            path="/baskets"
            element={
              <div className="p-5" style={{ width: "100%", height: "200vh" }}>
                Basket
              </div>
            }
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/positions" element={<Positions />} />
        </Routes>
      </div>
    </div>
  );
}
