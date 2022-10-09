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
          <Route path="/positions" element={<Positions />} />
        </Routes>
      </div>
    </div>
  );
}
