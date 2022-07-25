import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Markets",
    path: "/markets",
  },
  {
    name: "Baskets",
    path: "/baskets",
  },
  {
    name: "Orders",
    path: "/orders",
  },
  {
    name: "Holdings",
    path: "/holdings",
  },
  {
    name: "Positions",
    path: "/positions",
  },
  {
    name: "Funds",
    path: "/funds",
  },
  {
    name: "Analyse",
    path: "/analyse",
  },
];

export const Header = () => {
  return (
    <div className="px-4 max-h-16 h-16 flex justify-between items-center shadow-sm">
      <div className="flex justify-between items-center gap-4 w-[50%] overflow-hidden">
        <span className="text-xl font-medium text-primary">TRADE.COM</span>
        <div className="flex text-right gap-4 text-xs font-medium mr-4">
          <div>
            <div>
              <span>NIFTY 50</span>{" "}
              <span className="text-failure">54878.88</span>
            </div>
            <div className="text-secondary">-167.25(-0.01%)</div>
          </div>
          <div>
            <div>
              <span>SENSEX</span> <span className="text-success">54878.88</span>
            </div>
            <div className="text-secondary">+167.25(+0.01%)</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 w-full">
        <div className="text-sm flex gap-4 justify-between w-full ml-4">
          {links.map((link) => (
            <NavLink
              key={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-highlightText underline decoration-2 font-medium underline-offset-8"
                  : "text-primary"
              }
              to={link.path}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        <div className="text-neutral text-sm flex gap-2 border-border border-l pl-2">
          <span className="rounded-full">
            <AccountCircleIcon />
          </span>
          <span>LK43001</span>
        </div>
      </div>
    </div>
  );
};
