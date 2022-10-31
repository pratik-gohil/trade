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
  disablePadding?: boolean;
  numeric?: boolean;
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
          <TableCell padding="checkbox">
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
            align={headCell.numeric ? "right" : "left"}
            // padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <span className="text-primary text-xs">{headCell.label}</span>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
