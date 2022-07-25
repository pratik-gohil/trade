import React from "react";
import { Routes, Route } from "react-router-dom";
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
                style={{ width: "100%", height: "100%", background: "#eee" }}
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
            path="/basket"
            element={
              <div
                style={{ width: "100%", height: "100%", background: "#eee" }}
              >
                Basket
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
