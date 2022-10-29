import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function CorporateAction() {
  return (
    <div className="p-5 border rounded">
      <h1 className="font-semibold text-primary text-2xl">Corporate Action</h1>

      <div className="flex gap-7 my-5">
        <NavLink
          to="dividend"
          className={({ isActive }) =>
            `text-lg ${
              isActive
                ? "text-blue font-medium underline underline-offset-[9px]"
                : "text-secondary"
            }`
          }
        >
          Dividend
        </NavLink>
        <NavLink
          to="bonus"
          className={({ isActive }) =>
            `text-lg ${
              isActive
                ? "text-blue font-medium underline underline-offset-[9px]"
                : "text-secondary"
            }`
          }
        >
          Bonus
        </NavLink>
        <NavLink
          to="split"
          className={({ isActive }) =>
            `text-lg ${
              isActive
                ? "text-blue font-medium underline underline-offset-[9px]"
                : "text-secondary"
            }`
          }
        >
          Split
        </NavLink>
        <NavLink
          to="board-meet"
          className={({ isActive }) =>
            `text-lg ${
              isActive
                ? "text-blue font-medium underline underline-offset-[9px]"
                : "text-secondary"
            }`
          }
        >
          Board Meet
        </NavLink>
      </div>

      <div className="max-h-[calc(100vh-4rem-40px-45px-10.5rem)] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default CorporateAction;
