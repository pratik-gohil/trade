import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as JsSearch from "js-search";
import {
  SettingsOutlined,
  EditOutlined,
  Delete,
  Search,
  MoreVert,
  CancelOutlined,
  // Done,
  Add,
  ArrowDropUp,
  ArrowDropDown,
  Done,
} from "@mui/icons-material";
import useModal from "../../hooks/useModal";
import { visiblityReducer } from "../../features/orderModal/orderModal";
import { useDispatch } from "react-redux";
import { getGroups } from "../../http/getGroups/getGroups";
import { getGroupSymbols } from "../../http/getGroupSymbols/getGroupSymbols";
import { SocketContext } from "../../socket";
import { subscribeInstruments } from "../../http/subscribeInstruments/subscribeInstruments";
import { unsubscribeInstruments } from "../../http/unsubscribeInstruments/unsubscribeInstruments";
import { searchInstruments } from "../../http/searchInstruments/searchInstruments";
import { Segments } from "../../types/enums/segment.enums.types";
import { IInstrument } from "../../types/interfaces/instrument.interfaces.types";
import { delSymbol } from "../../http/delSymbol/delSymbol";
import { addSymbol } from "../../http/addSymbol/addSymbol";
import { constants } from "../../constants/global";
import { FormControlLabel, FormGroup, RadioGroup } from "@mui/material";
import CustomRadio from "../Radio/Radio";
import { percDiff } from "../../utils/percentageDiffrence";
import CustomCheckbox from "../Checkbox/Checkbox";
import { mapMaster } from "./masters";
const { USER_ID } = constants;

interface IMasterInstrument {
  exchangeSegment: string;
  exchangeInstrumentID: string;
  instrumentType: string;
  name: string;
  description: string;
  series: string;
  nameWithSeries: string;
  instrumentID: string;
  highPriceBand: string;
  lowPriceBand: string;
  freezeQty: string;
  tickSize: string;
  lotSize: string;
  multiplier: string;
  underlyingInstrumentId: string;
  contractExpiration: string;
  strikePrice: string;
  optionType: string;
}

interface IGroup {
  isDefault: boolean;
  isEditable: boolean;
  groupName: string;
  isSectorWatch: boolean;
  isPredefinedGroup: boolean;
  exchangeSegment: string;
}

interface IGroupSymbol {
  exchangeSegment: number;
  exchangeInstrumentID: string;
}

export function WatchList() {
  const [search, setSearch] = useState<any>(null);
  const [selectedIndiceType, setSelectedIndiceType] = useState("Indian");
  const [selectedGroup, setSelectedGroup] = useState("Indices");
  const [instrumentSearch, setInstrumentSearch] = useState("");
  const [master, setMaster] = useState<IMasterInstrument[]>([]);
  const [instruments, setInstruments] = useState<IInstrument[]>([]);
  const [groupSymbols, setGroupSymbols] = useState<IGroupSymbol[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [filters, setFilters] = useState({
    filterBy: "A-Z",
    changeBy: "close",
    changeByFormat: "percentage",
    showDirection: false,
    showChange: true,
    showHoldings: true,
  });
  const tradeBoxes = ["TradeBox 1", "TradeBox 2", "TradeBox 3", "TradeBox 4"];
  const indiceTypes = ["Indian", "Global", "Commodity", "Currency"];
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
  const { socket } = useContext(SocketContext) as { socket: any };

  const increment = 10000;
  const [searchIndex, setSearchIndex] = useState(increment);
  const observer = useRef<IntersectionObserver | null>(null);
  const endRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (searchIndex < master.length) {
          setSearchIndex(searchIndex + increment);
        }
      }
    });
    if (node) observer?.current?.observe(node);
  }, []);

  useEffect(() => {
    setSearch(new JsSearch.Search("DisplayName"));
  }, []);

  useEffect(() => {
    if (search && master) {
      search.addIndex("name");
      search.addIndex("description");

      search.addDocuments(master);
    }
  }, [search, master]);

  const masterSearchResult = useMemo(() => {
    if (search !== null && instrumentSearch !== "") {
      const result = search.search(instrumentSearch);
      return result;
    }
  }, [instrumentSearch, master, search]);

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
        if (selectedIndiceType === "Indian") {
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
  }, [selectedGroup, selectedIndiceType]);

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

  useEffect(() => {
    (async () => {
      const response = await mapMaster(["NSECM", "BSECM", "NSECD", "NSEFO"]);
      setMaster(response);
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
    addSymbol(data).then(() => {
      fetchGroupSymbols();
    });
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

  const filterAlphabatically = (a, b) => {
    return a?.DisplayName.localeCompare(b?.DisplayName);
  };

  const filterByPercentChange = (a, b) => {
    return a?.Touchline?.PercentChange - b?.Touchline?.PercentChange;
  };

  const filterByLTP = (a, b) => {
    return a?.Touchline?.LastTradedPrice - b?.Touchline?.LastTradedPrice;
  };

  const filterEXH = (a, b) => {
    return Segments[a?.ExchangeSegment].localeCompare(
      Segments[b?.ExchangeSegment]
    );
  };

  const filterInstruments = (a, b) => {
    switch (filters.filterBy) {
      case "A-Z":
        return filterAlphabatically(a, b);
      case "%":
        return filterByPercentChange(a, b);
      case "LTP":
        return filterByLTP(a, b);
      case "EXH":
        return filterEXH(a, b);
      default:
        return filterAlphabatically(a, b);
    }
  };

  useEffect(() => {
    socket.on("1502-json-full", (res) => {
      const data = JSON.parse(res);
      setInstruments((instruments) =>
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
    <>
      <div className="relative h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-y-auto sidebar-width flex flex-col items-center border-r border-border">
        {selectedGroup === "Indices" ? (
          <div className="flex gap-2 w-full px-4 py-3">
            {indiceTypes.map((indice) => (
              <span
                key={indice}
                className={`${
                  indice === selectedIndiceType
                    ? "selected-tab"
                    : "text-secondary"
                } py-1 px-2 rounded cursor-pointer text-lg`}
                onClick={() => setSelectedIndiceType(indice)}
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
                  setInstrumentSearch(e.target.value);
                }}
                placeholder="Search eg: infy bse, nifty fut, nifty weekly"
                className="w-full outline-none bg-transparent"
              />
              {instrumentSearch ? (
                <CancelOutlined
                  color="inherit"
                  fontSize="small"
                  onClick={() => setInstrumentSearch("")}
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
            {masterSearchResult.map((instrument) => {
              const inWatchlist = groupSymbols
                .map((e) => e.exchangeInstrumentID)
                .includes(instrument.exchangeInstrumentID);
              return (
                <div
                  key={instrument.instrumentID}
                  className="w-full relative group"
                >
                  <div className="w-full  border-border border-b p-5 flex justify-between items-center">
                    <div>
                      <div className="text-primary text-sm">
                        {instrument.DisplayName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-secondary bg-secondaryHighlight text-xs p-1 rounded-[4px]">
                        {instrument.exchangeSegment}
                      </div>
                    </div>
                  </div>

                  {selectedGroup !== "Indices" &&
                    selectedGroup !== "Predefined" && (
                      <div className="absolute right-0 top-0 h-full items-center gap-2 pr-2 hidden group-hover:flex">
                        <div
                          onClick={() =>
                            dispatch(
                              visiblityReducer({
                                visible: true,
                                order: { orderSide: "BUY" },
                                instrument,
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
                                order: { orderSide: "SELL" },
                                instrument,
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
                            !inWatchlist &&
                            handleAddInstrument({
                              userID: localStorage.getItem(USER_ID),
                              groupName: selectedGroup,
                              exchangeSegment: instrument.exchangeSegment,
                              exchangeInstrumentID:
                                instrument.exchangeInstrumentID,
                              symbolExpiry: instrument.ExDate,
                            })
                          }
                          className={`${
                            !inWatchlist ? "cursor-pointer" : ""
                          } rounded-sm overflow-hidden w-8 h-8 flex justify-center items-center border border-primary text-white bg-blue-gradient`}
                        >
                          {inWatchlist ? <Done /> : <Add />}
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
            <div ref={endRef} />
          </>
        ) : (
          instruments.sort(filterInstruments).map((instrument) => {
            const changeBy =
              filters.changeBy === "close"
                ? instrument?.Touchline?.Close
                : instrument?.Touchline?.Open;
            const diffrence = Number(
              (instrument?.Touchline?.LastTradedPrice - changeBy).toFixed(2)
            );
            const percentDiffrence = percDiff(
              instrument?.Touchline?.LastTradedPrice,
              changeBy
            );
            return (
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
                        {instrument?.Touchline?.LastTradedPrice}
                      </div>
                      <div
                        className={`text-xs ${
                          instrument?.Touchline?.PercentChange > 0
                            ? "text-success"
                            : "text-failure"
                        }`}
                      >
                        {filters.showChange && (
                          <span>
                            {diffrence > 0 && "+"}
                            {diffrence} ({percentDiffrence}%)
                          </span>
                        )}
                        {filters.showDirection &&
                          (instrument?.Touchline?.PercentChange > 0 ? (
                            <ArrowDropUp />
                          ) : (
                            <ArrowDropDown />
                          ))}
                      </div>
                    </div>
                  </div>

                  {selectedGroup !== "Indices" &&
                    selectedGroup !== "Predefined" && (
                      <div className="absolute right-0 top-0 h-full items-center gap-2 pr-2 hidden group-hover:flex text-base">
                        <div
                          onClick={() =>
                            dispatch(
                              visiblityReducer({
                                visible: true,
                                order: {
                                  orderSide: "BUY",
                                  instrument,
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
                                  orderSide: "SELL",
                                  instrument,
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
                            handleInstrumentExpand(
                              instrument.ExchangeInstrumentID
                            )
                          }
                          className="w-10 h-7 overflow-hidden cursor-pointer rounded-sm flex justify-center items-center bg-white text-primary border border-primary"
                        >
                          5
                        </div>
                        <div
                          onClick={() =>
                            handleDeleteInstrument({
                              groupName: selectedGroup,
                              exchangeInstrumentID:
                                instrument.ExchangeInstrumentID,
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
                    )}
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
                        {instrument.Bids.map((bid, i) => (
                          <tr className="text-xs">
                            <td className="p-1.5 text-success">{bid.Size}</td>
                            <td className="p-1.5 text-success">
                              {bid.TotalOrders}
                            </td>
                            <td className="p-1.5 text-success">{bid.Price}</td>
                            <td className="p-1.5 text-failure">
                              {instrument.Asks[i].Price}
                            </td>
                            <td className="p-1.5 text-failure">
                              {instrument.Asks[i].Size}
                            </td>
                            <td className="p-1.5 text-failure">
                              {instrument.Asks[i].TotalOrders}
                            </td>
                          </tr>
                        ))}
                        <tr className="text-xs">
                          <td className="p-1.5 text-success">
                            {instrument?.Touchline?.TotalBuyQuantity}
                          </td>
                          <td className="p-1.5 text-secondary" colSpan={4}>
                            Total
                          </td>
                          <td className="p-1.5 text-failure">
                            {instrument?.Touchline?.TotalSellQuantity}
                          </td>
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
                            <td>{instrument?.Touchline?.Open}</td>
                            <td>{instrument?.Touchline?.High}</td>
                            <td>{instrument?.Touchline?.Low}</td>
                            <td>{instrument?.Touchline?.Close}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="w-full flex justify-between py-2 text-sm">
                        <div className="flex justify-between w-full px-8">
                          <span className="text-secondary">Volume</span>
                          <span className="text-primary">
                            {instrument?.Touchline?.TotalTradedQuantity}
                          </span>
                        </div>
                        <div className="flex justify-between w-full px-8">
                          <span className="text-secondary">Avg. Price</span>
                          <span className="text-primary">
                            {instrument?.Touchline?.AverageTradedPrice}
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex justify-between py-2 text-sm">
                        <div className="flex justify-between w-full px-8">
                          <span className="text-secondary">LTT</span>
                          <span className="text-primary">
                            {new Date(instrument?.Touchline?.LastTradedTime)
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
            );
          })
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
                    onClick={() =>
                      setFilters((filters) => ({ ...filters, filterBy: fil }))
                    }
                    key={fil}
                    className={`${
                      fil === filters.filterBy
                        ? "border-blue text-blue font-medium"
                        : "border-border"
                    } text-center py-1 px-3 border cursor-pointer`}
                  >
                    {fil}
                  </div>
                ))}
              </div>
            </div>
            <div className="border-b border-border p-4">
              <div className="mb-4">Change</div>
              <RadioGroup
                sx={{ display: "flex", flexDirection: "row", gap: 2 }}
                aria-labelledby="watchlist-filter"
                name="watchlist-filter"
                defaultValue="close"
              >
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",
                    gap: 0.5,
                  }}
                  control={<CustomRadio />}
                  value="close"
                  label={
                    <span className="text-xs font-medium block">
                      Close Price
                    </span>
                  }
                />
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",
                    gap: 0.5,
                  }}
                  control={<CustomRadio />}
                  value="open"
                  label={
                    <span className="text-xs font-medium block">
                      Open Price
                    </span>
                  }
                />
              </RadioGroup>
            </div>
            <div className="border-b border-border p-4">
              <div className="mb-4">Change Format</div>
              <RadioGroup
                sx={{ display: "flex", flexDirection: "row", gap: 2 }}
                aria-labelledby="watchlist-filter-change-format"
                name="watchlist-filter-change-format"
                defaultValue="percentage"
              >
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",
                    gap: 0.5,
                  }}
                  control={<CustomRadio />}
                  value="percentage"
                  label={
                    <span className="text-xs font-medium block">
                      Percentage
                    </span>
                  }
                />
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",
                    gap: 0.5,
                  }}
                  control={<CustomRadio />}
                  value="absolute"
                  label={
                    <span className="text-xs font-medium block">Absolute</span>
                  }
                />
              </RadioGroup>
            </div>

            <div className="border-b border-border p-4">
              <FormGroup
                sx={{
                  gap: ".5rem",
                }}
              >
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",
                    gap: 0.5,
                  }}
                  control={
                    <CustomCheckbox
                      onChange={(e) =>
                        setFilters((filter) => ({
                          ...filter,
                          showDirection: e.target.checked,
                        }))
                      }
                      checked={filters.showDirection}
                      disableRipple
                    />
                  }
                  label={
                    <span className="text-xs font-medium block">
                      Show direction
                    </span>
                  }
                />
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",
                    gap: 0.5,
                  }}
                  control={
                    <CustomCheckbox
                      onChange={(e) =>
                        setFilters((filter) => ({
                          ...filter,
                          showChange: e.target.checked,
                        }))
                      }
                      checked={filters.showChange}
                      disableRipple
                    />
                  }
                  label={
                    <span className="text-xs font-medium block">
                      Show change
                    </span>
                  }
                />
                <FormControlLabel
                  sx={{
                    fontSize: "12px",
                    margin: 0,
                    display: "flex",
                    gap: 0.5,
                  }}
                  control={
                    <CustomCheckbox
                      onChange={(e) =>
                        setFilters((filter) => ({
                          ...filter,
                          showHoldings: e.target.checked,
                        }))
                      }
                      checked={filters.showHoldings}
                      disableRipple
                    />
                  }
                  label={
                    <span className="text-xs font-medium block">
                      Show holdings
                    </span>
                  }
                />
              </FormGroup>
              {/* <div className="flex items-center gap-2">
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
              </div> */}
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
                      <span>{i + 1}</span>
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
