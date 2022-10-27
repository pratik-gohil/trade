import React from "react";

const Divider = ({ margin = "20px" }) => {
  return (
    <div
      style={{ margin: `${margin} 0` }}
      className="w-full h-[1px] bg-border"
    ></div>
  );
};

export default Divider;
