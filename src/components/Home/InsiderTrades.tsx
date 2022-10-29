import React from "react";
import { NavLink } from "react-router-dom";

function InsiderTrades({ instrument }) {
  return (
    <div className="border rounded-md">
      <h1 className="p-5 flex gap-4">
        <NavLink
          to="/home/bulk-block-deals"
          className={({ isActive }) =>
            (isActive ? "text-blue font-medium" : "") + " text-lg"
          }
        >
          Bulk & Block Deals
        </NavLink>
        <NavLink
          to="/home/insider-trades"
          className={({ isActive }) =>
            (isActive ? "text-blue font-medium" : "") + " text-lg"
          }
        >
          Insider Trades
        </NavLink>
      </h1>
      <div>Insider Trades</div>
    </div>
  );
}

export default InsiderTrades;
