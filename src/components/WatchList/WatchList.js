import React, { Fragment, useRef, useState } from "react";
import {
  SettingsOutlined,
  EditOutlined,
  Delete,
  Search,
  MoreVert,
  CancelOutlined,
  Done,
  Add,
} from "@mui/icons-material";
import useModal from "../../hooks/useModal";

export function WatchList() {
  const [selectedIndice, setSelectedIndice] = useState("Indian");
  const [selectedWatchListTab, setSelectedWatchListTab] = useState("Indices");
  const [stockSearch, setStockSearch] = useState("");
  const filterModalRef = useRef(null);
  const filterModalToggleButton = useRef(null);
  const [showWatchListFilters] = useModal(
    filterModalRef,
    filterModalToggleButton
  );

  const [watchList, setWatchList] = useState([
    {
      id: 0,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 1,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 2,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 3,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 4,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 5,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 6,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 7,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
  ]);

  const [searchResult, setSearchResult] = useState([
    {
      id: 0,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 1,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 2,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 3,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 4,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 5,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 6,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
    {
      id: 7,
      name: "GOLD",
      exchange: "MCX",
      price: "16726.2",
      trends: "64.15 (0.32%)",
      isUpTrend: true,
      isExpanded: false,
    },
  ]);

  const watchListTabs = ["Indices", "1", "2", "3", "4", "5", "Predefined"];

  const tradeBoxes = ["TradeBox 1", "TradeBox 2", "TradeBox 3", "TradeBox 4"];

  const indices = ["Indian", "Global", "Commodity", "Currency"];

  const handleStockExpand = (id) => {
    setWatchList((prev) =>
      prev.map((stock) => {
        return stock.id === id
          ? { ...stock, isExpanded: !stock.isExpanded }
          : stock;
      })
    );
  };

  return (
    <>
      <div className="relative h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-y-auto w-[50%] flex flex-col items-center">
        {selectedWatchListTab === "Indices" ? (
          <div className="flex gap-2 w-full px-4 py-3">
            {indices.map((indice) => (
              <span
                key={indice}
                className={`${
                  indice === selectedIndice ? "selected-tab" : "text-secondary"
                } py-1 px-2 rounded cursor-pointer text-md`}
                onClick={() => setSelectedIndice(indice)}
              >
                {indice}
              </span>
            ))}
          </div>
        ) : (
          <div className="px-4 py-3 w-full">
            <div
              className={`${
                stockSearch
                  ? "bg-blueHighlight border-blue text-primary"
                  : "bg-inherit border-secondary text-secondary"
              } flex items-center px-2 py-2 gap-2 text-sm outline-blue-100 w-full bg-gray-100 rounded border`}
            >
              <Search color="inherit" fontSize="small" />
              <input
                value={stockSearch}
                onChange={(e) => setStockSearch(e.target.value)}
                placeholder="Search eg: infy bse, nifty fut, nifty weekly"
                className="w-full outline-none bg-transparent"
              />
              {stockSearch ? (
                <CancelOutlined
                  color="inherit"
                  fontSize="small"
                  onClick={() => setStockSearch("")}
                  className="cursor-pointer"
                />
              ) : (
                <span>5/10</span>
              )}
            </div>
          </div>
        )}

        {stockSearch
          ? searchResult.map((stock) => (
              <div key={stock.id} className="w-full relative group">
                <div className="w-full  border-border border-b p-4 flex justify-between items-center">
                  <div>
                    <div className="text-primary text-sm">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-secondary text-xs">
                      {stock.exchange}
                    </div>
                  </div>
                </div>

                <div className="absolute right-0 top-0 h-full items-center gap-2 pr-2 hidden group-hover:flex">
                  <div className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center text-white bg-green-gradient">
                    B
                  </div>
                  <div className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center text-white bg-red-gradient">
                    S
                  </div>
                  <div className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center bg-white text-primary border border-primary">
                    5
                  </div>
                  <div className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center border border-primary text-white bg-blue-gradient">
                    <Add />
                    {/* <Done /> */}
                  </div>
                </div>
              </div>
            ))
          : watchList.map((stock) => (
              <Fragment key={stock.id}>
                <div className="w-full relative group">
                  <div className="w-full  border-border border-b p-4 flex justify-between items-center">
                    <div>
                      <div className="text-primary text-sm">{stock.name}</div>
                      <div className="text-secondary text-xs">
                        {stock.exchange}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-primary text-sm">{stock.price}</div>
                      <div
                        className={`text-xs ${
                          stock.isUpTrend ? "text-success" : "text-failure"
                        }`}
                      >
                        {stock.trends}
                      </div>
                    </div>
                  </div>

                  <div className="absolute right-0 top-0 h-full items-center gap-2 pr-2 hidden group-hover:flex">
                    <div className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center text-white bg-green-gradient">
                      B
                    </div>
                    <div className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center text-white bg-red-gradient">
                      S
                    </div>
                    <div
                      onClick={() => handleStockExpand(stock.id)}
                      className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center bg-white text-primary border border-primary"
                    >
                      5
                    </div>
                    <div className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center border border-primary text-primary bg-white">
                      <Delete />
                    </div>
                    <div className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center border border-primary text-primary bg-white">
                      <MoreVert />
                    </div>
                  </div>
                </div>
                {stock.isExpanded && (
                  <div className="w-full">
                    <table className="w-full text-center">
                      <tr className="text-xs text-secondary border border-border">
                        <th className="p-2 font-normal">QTY.</th>
                        <th className="p-2 font-normal">ORDERS</th>
                        <th className="p-2 font-normal">BID</th>
                        <th className="p-2 font-normal">OFFER</th>
                        <th className="p-2 font-normal">ORDERS</th>
                        <th className="p-2 font-normal">QTY.</th>
                      </tr>
                      <tr className="text-success text-xs">
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">1</td>
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">1</td>
                        <td className="p-1.5">100</td>
                      </tr>
                      <tr className="text-success text-xs">
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">1</td>
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">1</td>
                        <td className="p-1.5">100</td>
                      </tr>
                      <tr className="text-success text-xs">
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">1</td>
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">1</td>
                        <td className="p-1.5">100</td>
                      </tr>
                      <tr className="text-success text-xs">
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">1</td>
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">1</td>
                        <td className="p-1.5">100</td>
                      </tr>
                      <tr className="text-success text-xs">
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">1</td>
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">100</td>
                        <td className="p-1.5">1</td>
                        <td className="p-1.5">100</td>
                      </tr>
                      <tr className="text-xs">
                        <td className="p-1.5 text-success">100</td>
                        <td className="p-1.5 text-secondary" colSpan="4">
                          Total
                        </td>
                        <td className="p-1.5 text-success">100</td>
                      </tr>
                    </table>
                    <div>
                      <table className="w-full text-center">
                        <tr className="text-xs text-secondary">
                          <th className="p-2 font-normal">Open</th>
                          <th className="p-2 font-normal">High</th>
                          <th className="p-2 font-normal">Low</th>
                          <th className="p-2 font-normal">Prev.Close</th>
                        </tr>
                        <tr className="text-xs text-primary">
                          <td>451</td>
                          <td>451</td>
                          <td>451</td>
                          <td>451</td>
                        </tr>
                      </table>
                      <div className="w-full flex justify-between py-2 text-sm">
                        <div className="flex justify-between w-full px-8">
                          <span className="text-secondary">Volume</span>
                          <span className="text-primary">1000</span>
                        </div>
                        <div className="flex justify-between w-full px-8">
                          <span className="text-secondary">Avg. Price</span>
                          <span className="text-primary">1000</span>
                        </div>
                      </div>
                      <div className="w-full flex justify-between py-2 text-sm">
                        <div className="flex justify-between w-full px-8">
                          <span className="text-secondary">LTT</span>
                          <span className="text-primary">1000</span>
                        </div>
                        <div className="flex justify-between w-full px-8">
                          <span className="text-secondary">LO/Up Cir.</span>
                          <span className="text-primary">1000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}

        <div className="text-md sticky mt-auto h-fit w-full bottom-0 left-0 right-0 bg-white px-4 py-3 shadow-sm  border-border border gap-2 flex flex-col">
          <div
            ref={filterModalRef}
            className={`${
              showWatchListFilters ? "block" : "hidden"
            } absolute m-4 bottom-full right-0 bg-white shadow rounded overflow-hidden w-fit`}
          >
            <div className="border-b border-border p-4">
              <div className="flex justify-between mb-4">
                <div>Sort By</div>
                <div>
                  <button className="py-1 px-3 bg-blue-gradient text-white rounded">
                    Save
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                {["A-Z", "%", "LTP", "EXH"].map((fil) => (
                  <div
                    key={fil}
                    className={`text-center py-1 px-3 border border-border cursor-pointer`}
                  >
                    {fil}
                  </div>
                ))}
              </div>
            </div>
            <div className="border-b border-border p-4">
              <div className="mb-4">Change</div>
              <div className="flex items-center gap-4">
                <div className="flex justify-between items-center gap-2">
                  <input
                    name="watchlist-filter"
                    value="close"
                    id="watchlist-filter-close-price"
                    type="radio"
                    className="cursor-pointer"
                  />{" "}
                  <label
                    htmlFor="watchlist-filter-close-price"
                    className="cursor-pointer"
                  >
                    Close Price
                  </label>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <input
                    name="watchlist-filter"
                    value="open"
                    id="watchlist-filter-open-price"
                    type="radio"
                    className="cursor-pointer"
                  />{" "}
                  <label
                    htmlFor="watchlist-filter-open-price"
                    className="cursor-pointer"
                  >
                    Open Price
                  </label>
                </div>
              </div>
            </div>
            <div className="border-b border-border p-4">
              <div className="mb-4">Change Format</div>
              <div className="flex items-center gap-4">
                <div className="flex justify-between items-center gap-2">
                  <input
                    name="watchlist-filter-format"
                    value="percentage"
                    id="watchlist-filter-format-percentage"
                    type="radio"
                    className="cursor-pointer"
                  />{" "}
                  <label
                    htmlFor="watchlist-filter-format-percentage"
                    className="cursor-pointer"
                  >
                    Percentage
                  </label>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <input
                    name="watchlist-filter-format"
                    value="absolute"
                    id="watchlist-filter-format-absolute"
                    type="radio"
                    className="cursor-pointer"
                  />{" "}
                  <label
                    htmlFor="watchlist-filter-format-absolute"
                    className="cursor-pointer"
                  >
                    Absolute
                  </label>
                </div>
              </div>
            </div>

            <div className="border-b border-border p-4">
              <div className="flex items-center gap-2">
                <input id="watchlist-filter-show-direction" type="checkbox" />{" "}
                <label htmlFor="watchlist-filter-show-direction">
                  Show direction
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input id="watchlist-filter-show-change" type="checkbox" />{" "}
                <label htmlFor="watchlist-filter-show-change">
                  Show change
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input id="watchlist-filter-show-holding" type="checkbox" />{" "}
                <label htmlFor="watchlist-filter-show-holding">
                  Show holding
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center text-secondary">
            <div className="flex rounded overflow-hidden max-w-[90%] w-[90%]">
              {watchListTabs.map((tab, i) => (
                <div
                  key={tab}
                  className={`${
                    tab === selectedWatchListTab ? "selected-tab" : ""
                  } flex-1 text-center py-1 px-3 border border-border cursor-pointer`}
                  onClick={() => setSelectedWatchListTab(tab)}
                >
                  <span>{tab}</span>
                </div>
              ))}
            </div>
            <SettingsOutlined
              ref={filterModalToggleButton}
              className={`${
                showWatchListFilters ? "rotate-90" : "rotate-0"
              } cursor-pointer text-primary transition`}
            />
          </div>
          <div className="flex justify-between items-center text-secondary">
            <div className="flex rounded overflow-hidden max-w-[90%] w-[90%]">
              {tradeBoxes.map((tradeBox) => (
                <div
                  key={tradeBox}
                  className={`flex-1 text-center
                py-1 px-2 border border-border cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis`}
                >
                  {tradeBox}
                </div>
              ))}
            </div>
            <EditOutlined className="cursor-pointer text-primary" />
          </div>
        </div>
      </div>
    </>
  );
}
