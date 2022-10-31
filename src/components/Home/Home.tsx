import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function TVCFooter() {
  const footerLinks = [
    {
      label: "Chart",
      path: "chart",
    },
    { label: "Fundamentals", path: "fundamentals" },
    { label: "News", path: "news" },
    { label: "OI Stats", path: "oi-stats" },
    { label: "Option Chain", path: "option-chain" },
    { label: "Bulk & Block Deals", path: "bulk-block-deals" },
    { label: "Corporate Action", path: "corporate-action" },
  ];

  return (
    <div className="p-2 flex gap-2 border-t shadow-custom-sm">
      {footerLinks.map((link) => (
        <NavLink
          className={({ isActive }) =>
            (isActive ? "selected-tab" : "text-secondary") +
            " py-1 px-2 rounded cursor-pointer text-lg"
          }
          to={`/home/${link.path}`}
          key={link.path}
        >
          <a href={`/home/${link.path}`}>{link.label}</a>
        </NavLink>
      ))}
    </div>
  );
}

function Home({ instrument }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(instrument);
    instrument.PreferredExchangeSegment === 0 && navigate("/home/chart");
  }, [instrument]);

  return (
    <div className="h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-hidden flex flex-col gap-3">
      <div className="p-3 pb-0 flex-1 flex flex-col gap-3">
        <div className="border p-2 rounded-md">header</div>
        <Outlet />
      </div>
      {instrument.PreferredExchangeSegment !== 0 ? (
        <TVCFooter />
      ) : (
        <div className="mb-3" />
      )}
    </div>
  );
}

export default Home;
