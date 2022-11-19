import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { AllOrders, Orders } from "../Orders";
import { Positions } from "../Positions";
import { TVChartContainer } from "../TVChartContainer";
import { WatchList } from "../WatchList";
import Home from "../Home/Home";
import News from "../Home/News";
import BulkBlock from "../Home/BulkBlock";
// import InsiderTrades from "../Home/InsiderTrades";
import { Funds } from "../Funds";
import Fundamentals from "../Home/Fundamentals";
import Overview from "../Home/Fundamentals/Overview";
import Quarterly from "../Home/Fundamentals/Quarterly";
import Annual from "../Home/Fundamentals/Annual";
import BalanceSheet from "../Home/Fundamentals/BalanceSheet";
import Ratios from "../Home/Fundamentals/Ratios";
import ShareHolding from "../Home/Fundamentals/ShareHolding";
import Peers from "../Home/Fundamentals/Peers";
import CashFlow from "../Home/Fundamentals/CashFlow";
import { Holdings } from "../Holdings";
import { Profile } from "../Profile";
import CorporateAction from "../Home/CorporateAction";
import CorporateActionTable from "../Home/CorporateAction/CorporateActionTable";
import Ledger from "../Funds/Ledger";
import Deposits from "../Funds/Deposits";
import Withdrawals from "../Funds/Withdrawals";
import GTTOrders from "../Orders/GTTOrders";

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
              path="bulk-block-deals"
              element={<BulkBlock instrument={instrument} />}
            />
            {/* <Route
              path="insider-trades"
              element={<InsiderTrades instrument={instrument} />}
            /> */}
            <Route path="corporate-action" element={<CorporateAction />}>
              <Route index element={<Navigate to="dividend" />} />
              <Route
                path="dividend"
                element={
                  <CorporateActionTable
                    type="Dividend"
                    instrument={instrument}
                  />
                }
              />
              <Route
                path="Bonus"
                element={
                  <CorporateActionTable type="Bonus" instrument={instrument} />
                }
              />
              <Route
                path="Split"
                element={
                  <CorporateActionTable type="Split" instrument={instrument} />
                }
              />
              <Route
                path="board-meet"
                element={
                  <CorporateActionTable
                    type="BoardMeeting"
                    instrument={instrument}
                  />
                }
              />
            </Route>
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
          <Route path="/orders" element={<Orders />}>
            <Route index element={<AllOrders />} />
            <Route path="GTT" element={<GTTOrders />} />
          </Route>
          <Route path="/funds" element={<Funds />} />
          <Route path="/funds/ledger" element={<Ledger />} />
          <Route path="/funds/deposits" element={<Deposits />} />
          <Route path="/funds/withdrawals" element={<Withdrawals />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
