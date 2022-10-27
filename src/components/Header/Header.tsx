import React, { useContext, useEffect, useState, useRef } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { subscribeInstruments } from "../../http/subscribeInstruments/subscribeInstruments";
import { searchInstruments } from "../../http/searchInstruments/searchInstruments";
import { SocketContext } from "../../socket";
import { percDiff } from "../../utils/percentageDiffrence";
import { IInstrument } from "../../types/interfaces/instrument.interfaces.types";
import trade from "../../assets/trade.png";
import { unsubscribeInstruments } from "../../http/unsubscribeInstruments/unsubscribeInstruments";
import { toFixedN } from "../../utils/toFixedN";
import useModal from "../../hooks/useModal";
import {
  AdminPanelSettings,
  Calculate,
  CardMembership,
  ContentPaste,
  DisplaySettings,
  Logout,
  People,
  Settings,
  SettingsPhone,
} from "@mui/icons-material";
import Divider from "../Divider/Divider";

const links = [
  {
    name: "Home",
    path: "/home/chart",
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

const pinnedInstrumentsIds = [
  { exchangeSegment: 1, exchangeInstrumentID: 26000 },
  { exchangeSegment: 11, exchangeInstrumentID: 26065 },
];

export const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [pinnedInstruments, setPinnedInstruments] = useState<IInstrument[]>([]);
  const { socket } = useContext(SocketContext) as { socket: any };

  const menuModalRef = useRef(null);
  const menuModalToggleButtonRef = useRef(null);
  const [showMenu] = useModal(menuModalRef, menuModalToggleButtonRef);

  useEffect(() => {
    (async () => {
      const response = await searchInstruments(pinnedInstrumentsIds);
      if (response.type === "success") {
        setPinnedInstruments(response.result);
        await subscribeInstruments({ instruments: pinnedInstrumentsIds });
      }
    })();

    return () => {
      unsubscribeInstruments({ instruments: pinnedInstruments });
    };
  }, []);

  useEffect(() => {
    const listener = (res) => {
      const data = JSON.parse(res);
      setPinnedInstruments((instruments) =>
        instruments.map((instrument) => {
          return instrument.ExchangeInstrumentID === data.ExchangeInstrumentID
            ? { ...instrument, ...data }
            : instrument;
        })
      );
    };
    socket.on("1501-json-full", listener);

    return () => {
      socket.off("1501-json-full", listener);
    };
  }, []);

  return (
    <div className="max-h-16 h-16 flex justify-between items-center shadow-custom relative z-50">
      <div className="flex justify-between items-center gap-4 sidebar-width overflow-hidden px-5">
        <Link to="/home">
          <img src={trade} className="w-[89px] h-[9px]" />
        </Link>
        <div className="flex text-right gap-4 text-xs font-medium mr-[10px]">
          {pinnedInstruments.map((instrument) => {
            const diffrence = toFixedN(
              instrument?.Touchline?.LastTradedPrice -
                instrument?.Touchline?.Close,
              2
            );
            const percentDiffrence = percDiff(
              instrument?.Touchline?.LastTradedPrice,
              instrument?.Touchline?.Close
            );
            return (
              <div key={instrument.ExchangeInstrumentID}>
                <div className="flex gap-2">
                  <span>{instrument?.DisplayName}</span>{" "}
                  <span
                    className={`${
                      instrument?.Touchline?.PercentChange > 0
                        ? "text-success"
                        : "text-failure"
                    }`}
                  >
                    {toFixedN(instrument?.Touchline?.LastTradedPrice, 2)}
                  </span>
                </div>
                <div className="text-secondary">
                  {Number(diffrence) > 0 && "+"}
                  {diffrence} ({percentDiffrence}%)
                </div>
              </div>
            );
          })}
          {/* <div>
            <div className="flex gap-2">
              <span>NIFTY 50</span>{" "}
              <span className="text-failure">54878.88</span>
            </div>
            <div className="text-secondary">-167.25(-0.01%)</div>
          </div> */}
          {/* <div>
            <div className="flex gap-2">
              <span>SENSEX</span> <span className="text-success">54878.88</span>
            </div>
            <div className="text-secondary">+167.25(+0.01%)</div>
          </div> */}
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
        <div
          ref={menuModalToggleButtonRef}
          className="text-[#444] font-medium text-sm flex items-center gap-2 border-border border-l pl-2 cursor-pointer"
        >
          <span className="rounded-full">
            <AccountCircleIcon />
          </span>
          <span>{user.ClientId}</span>
        </div>
        <div
          ref={menuModalRef}
          className={`shadow-popup ${
            showMenu ? "block" : "hidden"
          } absolute top-full mt-1 mr-[6px] right-0 bg-white rounded overflow-hidden w-fit text-base p-5 flex flex-col gap-[10px]`}
        >
          <NavLink to="/profile" className="text-xl text-primary font-medium">
            {user.ClientName}'s Profile
          </NavLink>
          <Divider margin="0px" />
          <NavLink to="/settings">
            <Settings sx={{ fontSize: "14px", marginRight: "12px" }} /> Settings
          </NavLink>
          <NavLink to="/sessions">
            <AdminPanelSettings
              sx={{ fontSize: "14px", marginRight: "12px" }}
            />{" "}
            Active Sessions
          </NavLink>
          <NavLink to="/backoffice">
            <DisplaySettings sx={{ fontSize: "14px", marginRight: "12px" }} />{" "}
            Backoffice
          </NavLink>
          <NavLink to="/pledge-unpledge">
            <ContentPaste sx={{ fontSize: "14px", marginRight: "12px" }} />{" "}
            Pledge Unpledgs
          </NavLink>
          <NavLink to="/subscription-pricing">
            <CardMembership sx={{ fontSize: "14px", marginRight: "12px" }} />{" "}
            Subscription & Pricing
          </NavLink>
          <NavLink to="/support-contact">
            <SettingsPhone sx={{ fontSize: "14px", marginRight: "12px" }} />{" "}
            Support & Contact
          </NavLink>
          <NavLink to="/calculator">
            <Calculate sx={{ fontSize: "14px", marginRight: "12px" }} />{" "}
            Calculator
          </NavLink>
          <NavLink to="/calculator">
            <People sx={{ fontSize: "14px", marginRight: "12px" }} /> Invite
            Friends
          </NavLink>
          <Divider margin="0px" />
          <NavLink to="/logout">
            <Logout sx={{ fontSize: "14px", marginRight: "12px" }} /> Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};
