import { Checkbox } from "@mui/material";
import React from "react";

export function CustomCheckbox(props) {
  return (
    <Checkbox
      {...props}
      sx={(theme) => ({
        padding: 0,
        "& .MuiSvgIcon-root": { fontSize: 16 },
        "&.Mui-checked": {
          color: theme.palette.blue.main,
        },
        "&:hover": { bgcolor: "transparent" },
      })}
      disableRipple
    />
  );
}
