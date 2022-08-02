import React from "react";
import { Routes, Route } from "react-router-dom";
import { Orders } from "../Orders";
import { Positions } from "../Positions";
import { WatchList } from "../WatchList";

export function Main() {
  return (
    <div className="flex">
      <WatchList />
      <div className="w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={
              <div
                style={{ width: "100%", height: "200vh", background: "#eee" }}
              >
                Home
              </div>
            }
          />
          <Route
            path="/markets"
            element={
              <div
                style={{ width: "100%", height: "100%", background: "#eee" }}
              >
                Market
              </div>
            }
          />
          <Route
            path="/baskets"
            element={
              <div
                style={{ width: "100%", height: "100%", background: "#eee" }}
              >
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
