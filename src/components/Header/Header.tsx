import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

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
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="max-h-16 h-16 flex justify-between items-center shadow-custom">
      <div className="flex justify-between items-center gap-4 sidebar-width overflow-hidden px-5">
        <span className="text-xl font-medium text-primary">TRADE.COM</span>
        <div className="flex text-right gap-4 text-xs font-medium mr-[10px]">
          <div>
            <div className="flex gap-2">
              <span>NIFTY 50</span>{" "}
              <span className="text-failure">54878.88</span>
            </div>
            <div className="text-secondary">-167.25(-0.01%)</div>
          </div>
          <div>
            <div className="flex gap-2">
              <span>SENSEX</span> <span className="text-success">54878.88</span>
            </div>
            <div className="text-secondary">+167.25(+0.01%)</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 w-full px-5">
        <div className="text-sm flex gap-4 justify-between w-full ml-4">
          {links.map((link) => (
            <NavLink
              key={link.path}
              className={({ isActive }) =>
                (isActive
                  ? "text-blue !underline !decoration-2 underline-offset-[5px] nav-link"
                  : "text-[#666] nav-link") + " font-medium hover:text-blue"
              }
              to={link.path}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        <div className="text-[#444] font-medium text-sm flex items-center gap-2 border-border border-l pl-2">
          <span className="rounded-full">
            <AccountCircleIcon />
          </span>
          <span>{user.userID || user.ClientId}</span>
        </div>
      </div>
    </div>
  );
};
