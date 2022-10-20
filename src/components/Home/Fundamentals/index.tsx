import React from "react";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";

function Fundamentals() {
  return (
    <div>
      <div className="flex gap-7">
        <NavLink
          to="overview"
          className={({ isActive }) =>
            `text-lg ${
              isActive
                ? "text-blue font-medium underline underline-offset-[9px]"
                : "text-secondary"
            }`
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="quarterly"
          className={({ isActive }) =>
            `text-lg ${
              isActive
                ? "text-blue font-medium underline underline-offset-[9px]"
                : "text-secondary"
            }`
          }
        >
          Quarterly P&L
        </NavLink>
        <NavLink
          to="annual"
          className={({ isActive }) =>
            `text-lg ${
              isActive
                ? "text-blue font-medium underline underline-offset-[9px]"
                : "text-secondary"
            }`
          }
        >
          Annual P&L
        </NavLink>
        <NavLink
          to="cash_flow"
          className={({ isActive }) =>
            `text-lg ${
              isActive
                ? "text-blue font-medium underline underline-offset-[9px]"
                : "text-secondary"
            }`
          }
        >
          Cash Flow
        </NavLink>
        <NavLink
          to="balance_sheet"
          className={({ isActive }) =>
            `text-lg ${
              isActive
                ? "text-blue font-medium underline underline-offset-[9px]"
                : "text-secondary"
            }`
          }
        >
          Balance Sheet
        </NavLink>
        <NavLink
          to="ratios"
          className={({ isActive }) =>
            `text-lg ${
              isActive
                ? "text-blue font-medium underline underline-offset-[9px]"
                : "text-secondary"
            }`
          }
        >
          Ratios
        </NavLink>
        <NavLink
          to="shareholding"
          className={({ isActive }) =>
            `text-lg ${
              isActive
                ? "text-blue font-medium underline underline-offset-[9px]"
                : "text-secondary"
            }`
          }
        >
          Shareholding
        </NavLink>
        <NavLink
          to="peers"
          className={({ isActive }) =>
            `text-lg ${
              isActive
                ? "text-blue font-medium underline underline-offset-[9px]"
                : "text-secondary"
            }`
          }
        >
          Peers
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}

export default Fundamentals;
