import React, { useContext, useEffect, useState } from "react";
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

const pinnedInstrumentsIds = [
  { exchangeSegment: 1, exchangeInstrumentID: 26000 },
  { exchangeSegment: 11, exchangeInstrumentID: 26065 },
];

export const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [pinnedInstruments, setPinnedInstruments] = useState<IInstrument[]>([]);
  const { socket } = useContext(SocketContext) as { socket: any };

  useEffect(() => {
    (async () => {
      const response = await searchInstruments(pinnedInstrumentsIds);
      if (response.type === "success") {
        setPinnedInstruments(response.result);
        await subscribeInstruments(pinnedInstrumentsIds);
      }
    })();

    return () => {
      unsubscribeInstruments(pinnedInstruments);
    };
  }, []);

  useEffect(() => {
    socket.on("1502-json-full", (res) => {
      const data = JSON.parse(res);
      setPinnedInstruments((instruments) =>
        instruments.map((instrument) => {
          return instrument.ExchangeInstrumentID === data.ExchangeInstrumentID
            ? { ...instrument, ...data }
            : instrument;
        })
      );
    });

    return () => {
      socket.off("1502-json-full");
    };
  }, []);

  return (
    <div className="max-h-16 h-16 flex justify-between items-center shadow-custom">
      <div className="flex justify-between items-center gap-4 sidebar-width overflow-hidden px-5">
        <Link to="/">
          <img src={trade} className="w-[89px] h-[9px]" />
        </Link>
        <div className="flex text-right gap-4 text-xs font-medium mr-[10px]">
          {pinnedInstruments.map((instrument) => {
            const diffrence =
              Number(
                (
                  instrument?.Touchline?.LastTradedPrice -
                  instrument?.Touchline?.Close
                ).toFixed(2)
              ) || 0;
            const percentDiffrence =
              percDiff(
                instrument?.Touchline?.LastTradedPrice,
                instrument?.Touchline?.Close
              ) || 0;
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
                    {instrument?.Touchline?.LastTradedPrice || 0}
                  </span>
                </div>
                <div className="text-secondary">
                  {diffrence > 0 && "+"}
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
