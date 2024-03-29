import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

type Order = "asc" | "desc";

export interface HeadCell {
  id: string;
  label: string;
  alignment?: "right" | "left" | "center" | "inherit" | "justify";
  sort?: boolean;
  className?: string;
}

interface EnhancedTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  numSelected?: number;
  allowSelection?: boolean;
  headCells: readonly HeadCell[];
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    allowSelection,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    headCells,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {allowSelection && (
          <TableCell
            padding="none"
            className="!pl-10"
            sx={{ padding: "0 !important" }}
          >
            <Checkbox
              color="secondary"
              indeterminate={
                numSelected
                  ? numSelected > 0 && numSelected < rowCount
                  : undefined
              }
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment || "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            // padding="none"
            sx={{ padding: "7px" }}
          >
            {headCell.sort || headCell.sort === undefined ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                IconComponent={KeyboardArrowDown}
                sx={(theme) => ({
                  color: "red",
                  "& .MuiSvgIcon-root": {
                    color: `${theme.palette.blue.main} !important`,
                  },
                })}
              >
                <span className={`text-primary text-xs ${headCell.className}`}>
                  {headCell.label}
                </span>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <span className="text-primary text-xs">{headCell.label}</span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
