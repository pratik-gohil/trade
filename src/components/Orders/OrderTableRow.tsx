import React, { useState } from "react";

import {
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Menu,
} from "@mui/material";
import CustomTooltip from "../CustomTooltip";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import {
  DeleteOutline,
  EditOutlined,
  Widgets,
  MoreVert,
  Repeat,
  AccessAlarm,
  NotificationsNone,
  CandlestickChartOutlined,
} from "@mui/icons-material";
import { visiblityReducer } from "../../features/orderModal/orderModal";
import { useDispatch } from "react-redux";
import { IOrderWithMarketDepth } from "./Orders";
import { Dispatch, SetStateAction } from "react";
import { toFixedN } from "../../utils/toFixedN";
import { Segments, Series } from "../../types/enums/segment.enums.types";
import { orderEntry } from "../../http/orderEntry/orderEntry";
import { constants } from "../../constants/global";
const { CLIENT_ID, USER_ID } = constants;

export const CustomListItemText = ({ children }) => {
  return (
    <ListItemText
      sx={(theme) => ({
        "& span": {
          fontSize: `12px`,
          color: theme.palette.primary.main,
        },
      })}
    >
      {children}
    </ListItemText>
  );
};

export const OrderTableRow = ({
  row,
  index,
  setShowDetails,
  allowSelection,
  showOrderStatus = false,
  isExecuted = false,
  selectedOption,
  setSelectedOption,
  selected,
  setSelected,
  isDeleteSelected,
  handleCancel,
  fetchOrders,
}: {
  row: IOrderWithMarketDepth;
  index: number;
  allowSelection?: boolean;
  setShowDetails: Dispatch<SetStateAction<IOrderWithMarketDepth | null>>;
  showOrderStatus?: boolean;
  isExecuted?: boolean;
  selectedOption?: any;
  setSelectedOption?: any;
  selected?: readonly number[];
  setSelected?: React.Dispatch<React.SetStateAction<readonly number[]>>;
  isDeleteSelected?: boolean;
  handleCancel?: (id: any) => void;
  fetchOrders: () => void;
}) => {
  const dispatch = useDispatch();
  // const [selected, setSelected] = React.useState<readonly number[]>([]);
  // const [selectedOption, setSelectedOption] = useState({
  //   type: "",
  //   id: "",
  // });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const toggleShowShowOptions = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [showOrderOptions, setShowOrderOptions] = useState(false);

  const handleClick = (event: React.MouseEvent<unknown>, name: number) => {
    if (!selected || !setSelected) return;

    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: number) =>
    !!selected && selected.indexOf(name) !== -1;

  const handleRepeat = async (row) => {
    const data = {
      clientID: localStorage.getItem(CLIENT_ID),
      userID: localStorage.getItem(USER_ID),
      exchangeSegment: Segments[row.ExchangeSegment],
      exchangeInstrumentID: row.ExchangeInstrumentID,
      productType: row.ProductType,
      orderType: row.OrderType,
      orderSide: row.OrderSide,
      timeInForce: row.TimeInForce,
      disclosedQuantity: row.OrderDisclosedQuantity,
      orderQuantity: row.OrderQuantity,
      limitPrice: row.OrderPrice,
      stopPrice: row.OrderStopPrice,
      isAMO: row.IsAMO,
    };

    const response = await orderEntry({
      data,
      isCover: false,
    });

    if (response.type === "success") {
      fetchOrders();
    }

    alert(response.description);
  };

  return (
    <TableRow
      hover
      sx={(theme) => ({
        "&": {
          outline: isDeleteSelected
            ? ""
            : `1px solid ${theme.palette.border.main}`,
        },
        "& td": { borderBottom: 0 },
      })}
      className={`group ${
        isDeleteSelected ? "bg-black bg-opacity-[0.04]" : ""
      }`}
      role="checkbox"
      aria-checked={isSelected(row.AppOrderID)}
      tabIndex={-1}
      selected={isSelected(row.AppOrderID)}
    >
      {allowSelection && (
        <TableCell padding="none" sx={{ padding: "0 !important" }}>
          <Checkbox
            onClick={(event) => {
              handleClick(event, row.AppOrderID);
            }}
            color="secondary"
            checked={isSelected(row.AppOrderID)}
            inputProps={{
              "aria-labelledby": `enhanced-table-checkbox-${index}`,
            }}
          />
        </TableCell>
      )}
      <TableCell id={`enhanced-table-checkbox-${index}`} scope="row">
        <span className="text-base">
          {row.ExchangeTransactTime.split(" ")[1]}
        </span>
      </TableCell>
      <TableCell className={`${showOrderStatus && "!flex !gap-2"}`}>
        <span
          className={`${
            row.OrderSide === "BUY"
              ? "text-success bg-successHighlight"
              : "text-failure bg-failureHighlight"
          } text-xs rounded-[4px] py-[5px] px-[6px]`}
        >
          {row.OrderSide}
        </span>
      </TableCell>
      <TableCell
        className={`relative ${isDeleteSelected ? "" : "border-r"} w-full`}
      >
        <div className="flex justify-between whitespace-nowrap pr-10">
          <span
            className={`text-base text-primary ${
              selectedOption?.id === row.AppOrderID.toString()
                ? `whitespace-nowrap overflow-hidden text-ellipsis ${
                    showOrderStatus
                      ? "max-w-[calc(100%-44px)]"
                      : "max-w-[calc(100%-80px)]"
                  }`
                : ""
            } group-hover:whitespace-nowrap group-hover:overflow-hidden group-hover:text-ellipsis ${
              showOrderStatus
                ? "group-hover:max-w-[calc(100%-44px)]"
                : "group-hover:max-w-[calc(100%-80px)]"
            }`}
          >
            {row.TradingSymbol}

            <span className="text-secondary text-xs mx-3">
              {Series[Segments[row.ExchangeSegment]]}
            </span>

            {showOrderStatus && (
              <CustomTooltip title={row.CancelRejectReason} arrow>
                <span
                  className={`${
                    row.OrderStatus === "Filled"
                      ? "text-success bg-successHighlight"
                      : row.OrderStatus === "Rejected"
                      ? "text-failure bg-failureHighlight cursor-help"
                      : "text-warning bg-warningHighlight"
                  } text-xs rounded-[4px] py-[5px] px-[6px] font-medium`}
                >
                  {row.OrderStatus === "Filled" ? "Executed" : row.OrderStatus}
                </span>
              </CustomTooltip>
            )}
          </span>
          <div
            className={`${
              (selectedOption?.type === "delete" &&
                selectedOption?.id === row.AppOrderID.toString()) ||
              (showOrderOptions &&
                selectedOption?.id === row.AppOrderID.toString())
                ? "flex"
                : "group-hover:flex justify-center items-center hidden bg-inherit bg-opacity-100"
            } gap-2 text-primary right-5 top-1/4 absolute`}
          >
            {isExecuted ? (
              <div
                className="border border-secondary !w-[28px] !h-[28px] rounded-lg cursor-pointer flex justify-center items-center hover:text-blue hover:border-blue"
                onClick={() => handleRepeat(row)}
              >
                <CustomTooltip title="Repeat" arrow>
                  <Repeat className="!w-[20px] !h-[20px]" />
                </CustomTooltip>
              </div>
            ) : (
              <>
                <div
                  onClick={() => {
                    setSelectedOption({
                      type: "edit",
                      id: row.AppOrderID.toString(),
                    });
                    dispatch(
                      visiblityReducer({
                        visible: true,
                        order: {
                          orderSide: row.OrderSide,
                          instrument: row,
                          isModify: true,
                        },
                      })
                    );
                  }}
                  className="border border-secondary !w-[28px] !h-[28px] rounded-lg cursor-pointer flex justify-center items-center hover:text-blue hover:border-blue"
                >
                  <CustomTooltip title="Modify" arrow>
                    <EditOutlined className="!w-[20px] !h-[20px]" />
                  </CustomTooltip>
                </div>
                <div
                  onClick={() =>
                    setSelectedOption({
                      type: "delete",
                      id: row.AppOrderID.toString(),
                    })
                  }
                  className={`${
                    selectedOption?.type === "delete" &&
                    selectedOption?.id === row.AppOrderID.toString()
                      ? "border-blue text-blue"
                      : "border-secondary"
                  } hover:text-blue hover:border-blue border !w-[28px] !h-[28px] rounded-lg cursor-pointer flex justify-center items-center`}
                >
                  <CustomTooltip title="Cancel" arrow>
                    <DeleteOutline className="!w-[20px] !h-[20px]" />
                  </CustomTooltip>
                </div>
              </>
            )}
            <div
              onClick={(e) => {
                setSelectedOption({
                  type: "options",
                  id: row.AppOrderID.toString(),
                });
                toggleShowShowOptions(e);
                setShowOrderOptions(!showOrderOptions);
              }}
              className={`${
                showOrderOptions ? "border-blue text-blue" : "border-secondary"
              } hover:text-blue hover:border-blue relative border !w-[28px] !h-[28px] rounded-lg cursor-pointer flex justify-center items-center`}
            >
              <CustomTooltip title="Options" arrow>
                <Widgets className="!w-[20px] !h-[20px]" />
              </CustomTooltip>
            </div>
          </div>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              setAnchorEl(null);
              setShowOrderOptions(false);
            }}
            sx={{ width: 320, maxWidth: "100%" }}
          >
            <MenuList>
              <MenuItem
                onClick={() => {
                  dispatch(
                    visiblityReducer({
                      visible: true,
                      order: {
                        orderSide: row.OrderSide,
                        instrument: row,
                        isModify: true,
                      },
                    })
                  );
                  setAnchorEl(null);
                  setShowOrderOptions(false);
                }}
              >
                <ListItemIcon>
                  <EditOutlined fontSize="small" />
                </ListItemIcon>
                <CustomListItemText>Modify</CustomListItemText>
              </MenuItem>
              {handleCancel && (
                <MenuItem
                  onClick={() => {
                    setSelectedOption({
                      type: "delete",
                      id: row.AppOrderID.toString(),
                    });

                    setAnchorEl(null);
                    setShowOrderOptions(false);
                  }}
                >
                  <ListItemIcon>
                    <DeleteOutline fontSize="small" />
                  </ListItemIcon>
                  <CustomListItemText>Cancel</CustomListItemText>
                </MenuItem>
              )}
              <MenuItem onClick={() => {}}>
                <ListItemIcon>
                  <Repeat fontSize="small" />
                </ListItemIcon>
                <CustomListItemText>Repeat</CustomListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setShowDetails(row);
                  setAnchorEl(null);
                  setShowOrderOptions(false);
                }}
              >
                <ListItemIcon>
                  <MoreVert fontSize="small" />
                </ListItemIcon>
                <CustomListItemText>Info</CustomListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <AccessAlarm fontSize="small" />
                </ListItemIcon>
                <CustomListItemText>Create GTT</CustomListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <NotificationsNone fontSize="small" />
                </ListItemIcon>
                <CustomListItemText>Create Alert</CustomListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>5</ListItemIcon>
                <CustomListItemText>Market Depth</CustomListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <CandlestickChartOutlined fontSize="small" />
                </ListItemIcon>
                <CustomListItemText>Scrip Profile</CustomListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </TableCell>
      <TableCell align="right" className="whitespace-nowrap">
        <span className="text-[#a9a9a9] text-base pl-10">
          {row.CumulativeQuantity} / {row.OrderQuantity}
        </span>
      </TableCell>
      <TableCell align="right">
        <span
          className={`
                            
                          ${
                            row.ProductType === "MIS" ||
                            row.ProductType === "INTRA"
                              ? "text-purple bg-purpleHighlight"
                              : "text-blue bg-blueHighlight"
                          } text-xs rounded-[4px] py-[5px] px-[6px]`}
        >
          {row.ProductType}
        </span>
      </TableCell>
      <TableCell align="right">
        <span className="text-primary text-base text-right">
          {toFixedN(row.OrderPrice)}
        </span>
      </TableCell>
      <TableCell align="right">
        <span className="text-primary text-base">
          {toFixedN(row?.Touchline?.LastTradedPrice || 0)}
        </span>
      </TableCell>
    </TableRow>
  );
};
