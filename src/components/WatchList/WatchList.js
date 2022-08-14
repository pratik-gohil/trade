import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SettingsOutlined,
  EditOutlined,
  Delete,
  Search,
  MoreVert,
  CancelOutlined,
  // Done,
  Add,
} from "@mui/icons-material";
import useModal from "../../hooks/useModal";
import { visiblityReducer } from "../../features/orderModal/orderModal";
import { useDispatch } from "react-redux";
// import master from "../../json/master.json";
import { getMaster } from "../../http/master/master";
import { getGroups } from "../../http/getGroups/getGroups";
import { getGroupSymbols } from "../../http/getGroupSymbols/getGroupSymbols";
import { SocketContext } from "../../socket";
import { subscribeInstruments } from "../../http/subscribeInstruments/subscribeInstruments";
import { unsubscribeInstruments } from "../../http/unsubscribeInstruments/unsubscribeInstruments";
import { searchInstruments } from "../../http/searchInstruments/searchInstruments";
import { Segments } from "../../types/enums/segment.enums.types";
import IInstrument from "../../types/interfaces/instrument.interfaces.types";
import { delSymbol } from "../../http/delSymbol/delSymbol";
import { addSymbol } from "../../http/addSymbol/addSymbol";
import { USER_ID } from "../../constants/global";

export function WatchList() {
  const [selectedIndice, setSelectedIndice] = useState("Indian");
  const [selectedGroup, setSelectedGroup] = useState("Indices");
  const [instrumentSearch, setStockSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [master, setMaster] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [groupSymbols, setGroupSymbols] = useState([]);
  const [groups, setGroups] = useState([]);
  const tradeBoxes = ["TradeBox 1", "TradeBox 2", "TradeBox 3", "TradeBox 4"];
  const indices = ["Indian", "Global", "Commodity", "Currency"];
  const indianIndicesList = [
    { exchangeSegment: 1, exchangeInstrumentID: 26000 },
    { exchangeSegment: 1, exchangeInstrumentID: 26065 },
    { exchangeSegment: 1, exchangeInstrumentID: 26001 },
    { exchangeSegment: 1, exchangeInstrumentID: 26002 },
    { exchangeSegment: 1, exchangeInstrumentID: 26005 },
    { exchangeSegment: 1, exchangeInstrumentID: 26031 },
    { exchangeSegment: 1, exchangeInstrumentID: 26003 },
    { exchangeSegment: 1, exchangeInstrumentID: 26052 },
    { exchangeSegment: 1, exchangeInstrumentID: 26009 },
    { exchangeSegment: 1, exchangeInstrumentID: 26014 },
    { exchangeSegment: 1, exchangeInstrumentID: 26007 },
    { exchangeSegment: 1, exchangeInstrumentID: 26041 },
    { exchangeSegment: 1, exchangeInstrumentID: 26032 },
    { exchangeSegment: 1, exchangeInstrumentID: 26036 },
    { exchangeSegment: 1, exchangeInstrumentID: 26040 },
    { exchangeSegment: 1, exchangeInstrumentID: 26047 },
    { exchangeSegment: 1, exchangeInstrumentID: 26054 },
    { exchangeSegment: 1, exchangeInstrumentID: 26053 },
    { exchangeSegment: 1, exchangeInstrumentID: 26012 },
    { exchangeSegment: 1, exchangeInstrumentID: 26057 },
    { exchangeSegment: 1, exchangeInstrumentID: 26015 },
    { exchangeSegment: 1, exchangeInstrumentID: 26018 },
    { exchangeSegment: 1, exchangeInstrumentID: 26055 },
    { exchangeSegment: 1, exchangeInstrumentID: 26042 },
    { exchangeSegment: 1, exchangeInstrumentID: 26027 },
    { exchangeSegment: 1, exchangeInstrumentID: 26060 },
  ];
  const filterModalRef = useRef(null);
  const filterModalToggleButton = useRef(null);
  const [showWatchListFilters] = useModal(
    filterModalRef,
    filterModalToggleButton
  );
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);

  const [liveInstrumentsData, setLiveInstrumentsData] = useState({});

  const increment = 10000;
  const [searchIndex, setSearchIndex] = useState(increment);
  const observer = useRef();
  const endRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (searchIndex < master.length) {
          setSearchIndex(searchIndex + increment);
        }
      }
    });
    if (node) observer.current.observe(node);
  });

  useEffect(() => {
    socket.on("1502-json-full", (res) => {
      const data = JSON.parse(res);
      setLiveInstrumentsData((prev) => ({
        ...prev,
        [data.ExchangeInstrumentID]: data,
      }));
    });

    return () => {
      socket.off("1502-json-full");
    };
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getGroups();

      setGroups(response.result.groupList);
      if (!selectedGroup) {
        setSelectedGroup(response.result.groupList[0].groupName);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedGroup === "Indices") {
        if (selectedIndice === "Indian") {
          const response = await searchInstruments(indianIndicesList);
          if (response.type === "success") {
            setInstruments(response.result);
            await subscribeInstruments(indianIndicesList);
          }
        } else {
          setInstruments([]);
          await unsubscribeInstruments(indianIndicesList);
        }
      } else {
        setInstruments([]);
        await unsubscribeInstruments(indianIndicesList);
      }
    })();
  }, [selectedGroup, selectedIndice]);

  const fetchGroupSymbols = async () => {
    if (selectedGroup) {
      if (selectedGroup === "Indices" || selectedGroup === "Predefined") {
        return;
      }
      const response = await getGroupSymbols({ groupName: selectedGroup });
      if (response.type === "success") {
        setGroupSymbols((prevGroupsSymbols) => {
          if (prevGroupsSymbols.length) {
            (async () => await unsubscribeInstruments(prevGroupsSymbols))();
          }
          return response.result.instruments;
        });
      }
    }
  };

  useEffect(() => {
    fetchGroupSymbols();
  }, [selectedGroup]);

  const fetchInstruments = () => {
    if (groupSymbols.length) {
      (async () => {
        await subscribeInstruments(groupSymbols);
        const response = await searchInstruments(groupSymbols);
        if (response.type === "success") {
          setInstruments(response.result);
        }
      })();
    } else {
      setInstruments([]);
    }
  };

  useEffect(() => {
    fetchInstruments();
  }, [groupSymbols]);

  const search = () => {
    if (instrumentSearch) {
      const result = master
        .slice(0, searchIndex)
        .filter(
          (s) =>
            s.name.includes(instrumentSearch.toUpperCase()) ||
            s.description.includes(instrumentSearch.toUpperCase())
        );
      setSearchResult(result);
    }
  };

  useEffect(() => {
    search();
  }, [master, instrumentSearch, searchIndex]);

  useEffect(() => {
    const keys = [
      "exchangeSegment",
      "exchangeInstrumentID",
      "instrumentType",
      "name",
      "description",
      "series",
      "nameWithSeries",
      "instrumentID",
      "highPriceBand",
      "lowPriceBand",
      "freezeQty",
      "tickSize",
      "lotSize",
      "multiplier",
      "underlyingInstrumentId",
      "contractExpiration",
      "strikePrice",
      "optionType",
      "underlyingIndexName",
      "DisplayName",
      "ISIN",
      "Numerator",
      "Denominator",
    ];
    (async () => {
      const response = await getMaster();
      if (response.type === "success") {
        let master = response.result
          .split("\n")
          .map((s) => s.split("|"))
          .map((s) => s.reduce((o, k, i) => ({ ...o, [keys[i]]: k }), {}));
        setMaster(master);
      }
    })();
  }, []);

  const handleInstrumentExpand = (id) => {
    setInstruments((prev) =>
      prev.map((instrument) => {
        return instrument.ExchangeInstrumentID === id
          ? { ...instrument, isExpanded: !instrument.isExpanded }
          : instrument;
      })
    );
  };

  const handleAddInstrument = (data) => {
    addSymbol(data);
  };

  const handleDeleteInstrument = ({
    groupName,
    exchangeInstrumentID,
    exchangeSegment,
    symbolExpiry,
  }) => {
    delSymbol({
      groupName,
      exchangeInstrumentID,
      exchangeSegment,
      symbolExpiry,
    }).then(() => {
      fetchGroupSymbols();
    });
  };

  return (
    <>
      <div className="relative h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-y-auto sidebar-width flex flex-col items-center border-r border-border">
        {selectedGroup === "Indices" ? (
          <div className="flex gap-2 w-full px-4 py-3">
            {indices.map((indice) => (
              <span
                key={indice}
                className={`${
                  indice === selectedIndice ? "selected-tab" : "text-secondary"
                } py-1 px-2 rounded cursor-pointer text-lg`}
                onClick={() => setSelectedIndice(indice)}
              >
                {indice}
              </span>
            ))}
          </div>
        ) : (
          <div className="px-5 py-3 w-full">
            <div
              className={`${
                instrumentSearch
                  ? "bg-blueHighlight border-blue text-primary"
                  : "bg-inherit border-secondary text-secondary"
              } flex items-center px-2 py-2 gap-2 text-sm outline-blue-100 w-full bg-gray-100 rounded-md border`}
            >
              <Search color="inherit" fontSize="small" />
              <input
                autoFocus
                type="text"
                value={instrumentSearch}
                onChange={(e) => {
                  setStockSearch(e.target.value);
                  setSearchIndex(0);
                }}
                placeholder="Search eg: infy bse, nifty fut, nifty weekly"
                className="w-full outline-none bg-transparent"
              />
              {instrumentSearch ? (
                <CancelOutlined
                  color="inherit"
                  fontSize="small"
                  onClick={() => setStockSearch("")}
                  className="cursor-pointer"
                />
              ) : (
                <></>
                // <span>5/10</span>
              )}
            </div>
          </div>
        )}

        {instrumentSearch ? (
          <>
            {searchResult.map((instrument) => (
              <div
                key={instrument.instrumentID}
                className="w-full relative group"
              >
                <div className="w-full  border-border border-b p-5 flex justify-between items-center">
                  <div>
                    <div className="text-primary text-sm">
                      {instrument.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-secondary bg-secondaryHighlight text-xs p-1 rounded-[4px]">
                      {instrument.exchangeSegment}
                    </div>
                  </div>
                </div>

                <div className="absolute right-0 top-0 h-full items-center gap-2 pr-2 hidden group-hover:flex">
                  <div
                    onClick={() =>
                      dispatch(
                        visiblityReducer({
                          visible: true,
                          order: { type: "BUY" },
                        })
                      )
                    }
                    className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center text-white bg-green-gradient"
                  >
                    B
                  </div>
                  <div
                    onClick={() =>
                      dispatch(
                        visiblityReducer({
                          visible: true,
                          order: { type: "SELL" },
                        })
                      )
                    }
                    className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center text-white bg-red-gradient"
                  >
                    S
                  </div>
                  <div className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center bg-white text-primary border border-primary">
                    5
                  </div>
                  <div
                    onClick={() =>
                      handleAddInstrument({
                        userID: localStorage.getItem(USER_ID),
                        groupName: selectedGroup,
                        exchangeSegment: instrument.exchangeSegment,
                        exchangeInstrumentID: instrument.instrumentID,
                        symbolExpiry: instrument.ExDate,
                      })
                    }
                    className="rounded-sm overflow-hidden cursor-pointer w-8 h-8 flex justify-center items-center border border-primary text-white bg-blue-gradient"
                  >
                    <Add />
                    {/* <Done /> */}
                  </div>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </>
        ) : (
          instruments.map((instrument) => (
            <Fragment key={instrument.ExchangeInstrumentID}>
              <div className="w-full relative group">
                <div className="w-full border-border border-b p-5 flex justify-between items-center">
                  <div>
                    <div className="text-primary text-base">
                      {instrument.DisplayName}
                    </div>
                    <div className="text-secondary text-xs">
                      {Segments[instrument.ExchangeSegment]}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary text-base">
                      {
                        liveInstrumentsData?.[instrument.ExchangeInstrumentID]
                          ?.Touchline?.LastTradedPrice
                      }
                    </div>
                    <div
                      className={`text-xs ${
                        liveInstrumentsData?.[instrument.ExchangeInstrumentID]
                          ?.Touchline?.PercentChange > 0
                          ? "text-success"
                          : "text-failure"
                      }`}
                    >
                      {parseFloat(
                        (liveInstrumentsData?.[instrument.ExchangeInstrumentID]
                          ?.Touchline?.LastTradedPrice *
                          liveInstrumentsData?.[instrument.ExchangeInstrumentID]
                            ?.Touchline?.PercentChange) /
                          100
                      ).toFixed(2)}{" "}
                      (
                      {parseFloat(
                        liveInstrumentsData?.[instrument.ExchangeInstrumentID]
                          ?.Touchline?.PercentChange
                      ).toFixed(2)}
                      %)
                    </div>
                  </div>
                </div>

                <div className="absolute right-0 top-0 h-full items-center gap-2 pr-2 hidden group-hover:flex text-base">
                  <div
                    onClick={() =>
                      dispatch(
                        visiblityReducer({
                          visible: true,
                          order: {
                            type: "BUY",
                            instrument,
                            data: liveInstrumentsData?.[
                              instrument.ExchangeInstrumentID
                            ],
                          },
                        })
                      )
                    }
                    className="w-10 h-7 overflow-hidden cursor-pointer rounded-sm flex justify-center items-center text-white bg-green-gradient"
                  >
                    B
                  </div>
                  <div
                    onClick={() =>
                      dispatch(
                        visiblityReducer({
                          visible: true,
                          order: {
                            type: "SELL",
                            instrument,
                            data: liveInstrumentsData?.[
                              instrument.ExchangeInstrumentID
                            ],
                          },
                        })
                      )
                    }
                    className="w-10 h-7 overflow-hidden cursor-pointer rounded-sm flex justify-center items-center text-white bg-red-gradient"
                  >
                    S
                  </div>
                  <div
                    onClick={() =>
                      handleInstrumentExpand(instrument.ExchangeInstrumentID)
                    }
                    className="w-10 h-7 overflow-hidden cursor-pointer rounded-sm flex justify-center items-center bg-white text-primary border border-primary"
                  >
                    5
                  </div>
                  <div
                    onClick={() =>
                      handleDeleteInstrument({
                        groupName: selectedGroup,
                        exchangeInstrumentID: instrument.ExchangeInstrumentID,
                        exchangeSegment: instrument.ExchangeSegment,
                        symbolExpiry: instrument.ExDate,
                      })
                    }
                    className="w-10 h-7 overflow-hidden cursor-pointer rounded-sm flex justify-center items-center border border-primary text-primary bg-white"
                  >
                    <Delete />
                  </div>
                  <div className="w-10 h-7 overflow-hidden cursor-pointer rounded-sm flex justify-center items-center border border-primary text-primary bg-white">
                    <MoreVert />
                  </div>
                </div>
              </div>
              {instrument.isExpanded && (
                <div className="w-full">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="text-xs text-secondary border border-border border-t-0 border-r-0">
                        <th className="p-2 font-normal">QTY.</th>
                        <th className="p-2 font-normal">ORDERS</th>
                        <th className="p-2 font-normal">BID</th>
                        <th className="p-2 font-normal">OFFER</th>
                        <th className="p-2 font-normal">ORDERS</th>
                        <th className="p-2 font-normal">QTY.</th>
                      </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                  </table>
                  <div>
                    <table className="w-full text-center">
                      <thead>
                        <tr className="text-xs text-secondary">
                          <th className="p-2 font-normal">Open</th>
                          <th className="p-2 font-normal">High</th>
                          <th className="p-2 font-normal">Low</th>
                          <th className="p-2 font-normal">Prev.Close</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-xs text-primary">
                          <td>
                            {
                              liveInstrumentsData?.[
                                instrument.ExchangeInstrumentID
                              ].Touchline.Open
                            }
                          </td>
                          <td>
                            {
                              liveInstrumentsData?.[
                                instrument.ExchangeInstrumentID
                              ].Touchline.High
                            }
                          </td>
                          <td>
                            {
                              liveInstrumentsData?.[
                                instrument.ExchangeInstrumentID
                              ].Touchline.Low
                            }
                          </td>
                          <td>
                            {
                              liveInstrumentsData?.[
                                instrument.ExchangeInstrumentID
                              ].Touchline.Close
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="w-full flex justify-between py-2 text-sm">
                      <div className="flex justify-between w-full px-8">
                        <span className="text-secondary">Volume</span>
                        <span className="text-primary">NA</span>
                      </div>
                      <div className="flex justify-between w-full px-8">
                        <span className="text-secondary">Avg. Price</span>
                        <span className="text-primary">
                          {
                            liveInstrumentsData?.[
                              instrument.ExchangeInstrumentID
                            ].Touchline.AverageTradedPrice
                          }
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between py-2 text-sm">
                      <div className="flex justify-between w-full px-8">
                        <span className="text-secondary">LTT</span>
                        <span className="text-primary">
                          {new Date(
                            liveInstrumentsData?.[
                              instrument.ExchangeInstrumentID
                            ].Touchline.LastTradedTime
                          )
                            .toLocaleDateString("en", {
                              year: "2-digit",
                              month: "2-digit",
                              day: "2-digit",
                            })
                            .replace(/\//g, ":")}
                        </span>
                      </div>
                      <div className="flex justify-between w-full px-8">
                        <span className="text-secondary">LO/Up Cir.</span>
                        <span className="text-primary">NA</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          ))
        )}

        <div className="text-md fixed mt-auto h-fit bottom-0 left-0 right-0 bg-white p-[10px] border-border border-t gap-2 flex flex-col sidebar-width shadow-custom-sm">
          <div
            ref={filterModalRef}
            className={`shadow-popup ${
              showWatchListFilters ? "block" : "hidden"
            } absolute bottom-full mb-4 mr-[6px] right-4 bg-white rounded overflow-hidden w-fit text-base`}
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
          <div className="flex justify-between items-center text-secondary gap-2">
            <div className="flex rounded overflow-hidden w-full border border-border">
              <div
                className={`${"border-r border-border"} ${
                  "Indices" === selectedGroup ? "selected-tab" : ""
                } flex-1 text-center py-1 px-[9.5px] cursor-pointer text-lg`}
                onClick={() => setSelectedGroup("Indices")}
              >
                <span>Indices</span>
              </div>
              {groups.map(
                (group, i) =>
                  group.isEditable && (
                    <div
                      key={group.groupName}
                      className={`${
                        i + 1 !== groups.length ? "border-r border-border" : ""
                      } ${
                        group.groupName === selectedGroup ? "selected-tab" : ""
                      } flex-1 text-center py-1 px-[9.5px] cursor-pointer text-lg`}
                      onClick={() => setSelectedGroup(group.groupName)}
                    >
                      <span>{i}</span>
                    </div>
                  )
              )}
              <div
                className={`${"border-r border-border"} ${
                  "Predefined" === selectedGroup ? "selected-tab" : ""
                } flex-1 text-center py-1 px-[9.5px] cursor-pointer text-lg`}
                onClick={() => setSelectedGroup("Predefined")}
              >
                <span>Predefined</span>
              </div>
            </div>
            <SettingsOutlined
              ref={filterModalToggleButton}
              className={`${
                showWatchListFilters ? "rotate-90" : "rotate-0"
              } cursor-pointer text-[#333] transition !w-[20px] !h-[20px]`}
            />
          </div>
          {tradeBoxes && (
            <div className="flex justify-between items-center text-secondary gap-2">
              <div className="flex rounded overflow-hidden w-full border border-border">
                {tradeBoxes.map((tradeBox, i) => (
                  <div
                    key={tradeBox}
                    className={`${
                      i + 1 !== tradeBoxes.length ? "border-r" : ""
                    } flex-1 text-center
                py-1 px-[5px] border-border cursor-pointer whitespace-nowrap overflow-hidden text-lg`}
                  >
                    {tradeBox}
                  </div>
                ))}
              </div>
              <EditOutlined className="cursor-pointer text-[#333] !w-[20px] !h-[20px]" />
            </div>
          )}
        </div>
        <div className="mb-[86px]"></div>
      </div>
    </>
  );
}
