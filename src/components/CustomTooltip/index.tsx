import React from "react";
import Tooltip from "@mui/material/Tooltip";

function CustomTooltip({ children, title, arrow }) {
  return (
    <Tooltip
      title={title}
      arrow={arrow}
      classes={{
        tooltip: "!bg-blue font-medium",
        arrow: "!text-blue",
      }}
      placement="top"
    >
      {children}
    </Tooltip>
  );
}

export default CustomTooltip;
