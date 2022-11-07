import { DateRange } from "@mui/icons-material";
import React, { useState, useEffect } from "react";

export function DatePicker({ onChange }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    onChange([from, to]);
  }, [from, to]);

  return (
    <div
      className={`h-[45px] text-[#8c8c8c] flex items-center relative border border-solid border-gray-300 px-3 rounded-lg w-fit`}
    >
      <span className="text-xs bg-white text-[#8c8c8c] absolute -top-2 left-2.5 px-1">
        Date range
      </span>
      <div>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="outline-none text-sm text-primary"
        />
        <span className="mx-1">-</span>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="outline-none text-sm text-primary"
        />
        <DateRange className="text-blue ml-7" />
      </div>
    </div>
  );
}
