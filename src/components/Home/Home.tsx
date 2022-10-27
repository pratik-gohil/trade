import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function TVCFooter() {
  const footerLinks = [
    "Chart",
    "Fundamentals",
    "News",
    "OI Stats",
    "Option Chain",
    "Bulk & Block Deals",
    "Corporate Action",
  ];

  return (
    <div className="p-2 flex gap-2 border-t shadow-custom-sm">
      {footerLinks.map((link) => (
        <NavLink
          className={({ isActive }) =>
            (isActive ? "selected-tab" : "text-secondary") +
            " py-1 px-2 rounded cursor-pointer text-lg"
          }
          to={`/home/${link.toLowerCase().split(" ").join("%20")}`}
          key={link}
        >
          {link}
        </NavLink>
      ))}
    </div>
  );
}

function Home({ instrument }) {
  const navigate = useNavigate();

  useEffect(() => {
    instrument.ExchangeInstrumentID === 26000 && navigate("/home/chart");
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-hidden flex flex-col gap-3">
      <div className="p-3 pb-0 flex-1 flex flex-col gap-3">
        <div className="border p-2 rounded-md">header</div>
        <Outlet />
      </div>
      {instrument.ExchangeInstrumentID !== 26000 ? (
        <TVCFooter />
      ) : (
        <div className="mb-3" />
      )}
    </div>
  );
}

export default Home;
