import React, { useState } from "react";

import {
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Menu,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import {
  DeleteOutline,
  EditOutlined,
  Widgets,
  MoreVert,
} from "@mui/icons-material";
import { visiblityReducer } from "../../features/orderModal/orderModal";
import { useDispatch } from "react-redux";
import { IOrderWithMarketDepth } from "./Orders";
import { Dispatch, SetStateAction } from "react";

export const OrderTableRow = ({
  row,
  index,
  setShowDetails,
  allowSelection,
}: {
  row: IOrderWithMarketDepth;
  index: number;
  allowSelection?: boolean;
  setShowDetails: Dispatch<SetStateAction<IOrderWithMarketDepth | null>>;
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [selectedOption, setSelectedOption] = useState({
    type: "",
    id: "",
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const toggleShowShowOptions = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [showOrderOptions, setShowOrderOptions] = useState(false);

  const handleClick = (event: React.MouseEvent<unknown>, name: number) => {
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

  const isSelected = (name: number) => selected.indexOf(name) !== -1;

  return (
    <TableRow
      sx={{
        "& td": selectedOption.type === "delete" ? { border: 0 } : {},
      }}
      className="group"
      role="checkbox"
      aria-checked={isSelected(row.AppOrderID)}
      tabIndex={-1}
      selected={isSelected(row.AppOrderID)}
    >
      {allowSelection && (
        <TableCell padding="checkbox">
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
      <TableCell
        id={`enhanced-table-checkbox-${index}`}
        scope="row"
        padding="none"
      >
        <span className="text-base">
          {row.ExchangeTransactTime.split(" ")[1]}
        </span>
      </TableCell>
      <TableCell>
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
      <TableCell>
        <span className="text-base text-primary">{row.TradingSymbol}</span>
      </TableCell>
      <TableCell>
        <span className="text-[#a9a9a9] text-base">{row.OrderQuantity}</span>
      </TableCell>
      <TableCell>
        <span
          className={`
                            ${
                              (selectedOption.type === "delete" &&
                                selectedOption.id ===
                                  row.AppOrderID.toString()) ||
                              (showOrderOptions &&
                                selectedOption.id === row.AppOrderID.toString())
                                ? "hidden"
                                : "group-hover:hidden inline"
                            }
                          ${
                            row.ProductType === "MIS" ||
                            row.ProductType === "INTRA"
                              ? "text-purple bg-purpleHighlight"
                              : "text-blue bg-blueHighlight"
                          } text-xs rounded-[4px] py-[5px] px-[6px]`}
        >
          {row.ProductType}
        </span>
        <div
          className={`${
            (selectedOption.type === "delete" &&
              selectedOption.id === row.AppOrderID.toString()) ||
            (showOrderOptions &&
              selectedOption.id === row.AppOrderID.toString())
              ? "flex"
              : "group-hover:flex hidden"
          } gap-2 text-primary`}
        >
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
            className="border border-secondary !w-[28px] !h-[28px] rounded-lg cursor-pointer flex justify-center items-center"
          >
            <EditOutlined className="!w-[20px] !h-[20px]" />
          </div>
          <div
            onClick={() =>
              setSelectedOption({
                type: "delete",
                id: row.AppOrderID.toString(),
              })
            }
            className={`${
              selectedOption.type === "delete" &&
              selectedOption.id === row.AppOrderID.toString()
                ? "border-blue text-blue"
                : "border-secondary"
            } border !w-[28px] !h-[28px] rounded-lg cursor-pointer flex justify-center items-center`}
          >
            <DeleteOutline className="!w-[20px] !h-[20px]" />
          </div>
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
            } relative border border-secondary !w-[28px] !h-[28px] rounded-lg cursor-pointer flex justify-center items-center`}
          >
            <Widgets className="!w-[20px] !h-[20px]" />
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
            <MenuItem onClick={() => setShowDetails(row)}>
              <ListItemIcon>
                <MoreVert fontSize="small" />
              </ListItemIcon>
              <ListItemText>Details {row.TradingSymbol}</ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
      </TableCell>
      <TableCell>
        <span className="text-[#a9a9a9] text-base">{row.OrderPrice}</span>
      </TableCell>
      <TableCell>
        <span className="text-primary text-base">
          {row?.Touchline?.LastTradedPrice || 0}
        </span>
      </TableCell>
    </TableRow>
  );
};
