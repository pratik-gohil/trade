import React from "react";
import { Switch, useTheme } from "@mui/material";
import { useCustomSwitch } from "./Switch.styles";
import { makeStyles } from "@mui/styles";

export function CustomSwitch({ onChange, color }) {
  const theme = useTheme();
  const useStyles = makeStyles(useCustomSwitch(theme, color));
  const customSwitchClasses = useStyles();

  return <Switch classes={customSwitchClasses} onChange={onChange} />;
}
