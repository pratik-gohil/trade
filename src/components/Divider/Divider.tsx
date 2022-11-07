import React from "react";

export const Divider = ({ margin = "20px" }) => {
  return (
    <div
      style={{ margin: `${margin} 0` }}
      className="w-full h-[1px] bg-border"
    ></div>
  );
};
