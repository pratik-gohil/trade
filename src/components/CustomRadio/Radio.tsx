import { Radio } from "@mui/material";
import React from "react";

export function CustomRadio(props) {
  return (
    <Radio
      {...props}
      sx={(theme) => ({
        color: "#8c8c8c",
        "& .MuiSvgIcon-root": {
          fontSize: 16,
        },
        "&.MuiRadio-root": {
          padding: "0px",
        },
        "&.Mui-checked": {
          border: theme.palette.blue.main,
          color: theme.palette.blue.main,
          "& + .MuiFormControlLabel-label": {
            color: theme.palette.blue.main,
          },
        },
      })}
    />
  );
}
