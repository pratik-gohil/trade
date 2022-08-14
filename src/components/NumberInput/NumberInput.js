import React from "react";
import { Add, Remove } from "@mui/icons-material";

export function NumberInput({ label, value, onChange, disabled = false }) {
  return (
    <div
      className={`h-[45px] text-[#8c8c8c] flex items-center relative border border-solid border-gray-300 px-3 rounded-lg ${
        disabled ? "input-disabled cursor-not-allowed" : ""
      }`}
    >
      <span className="text-xs bg-white text-[#8c8c8c] absolute -top-2 left-2.5 px-1">
        {label}
      </span>
      <div className="flex">
        <button
          disabled={disabled}
          onClick={() => onChange(++value)}
          className={`${
            disabled ? "cursor-not-allowed invisible" : "cursor-pointer"
          } text-primary`}
        >
          <Add fontSize="inherit" className="text-[#333]" />
        </button>

        <input
          type="number"
          placeholder=""
          autoCorrect="off"
          min="1"
          autoFocus="autofocus"
          className={`${
            disabled ? "cursor-not-allowed" : ""
          } outline-0 text-center bg-transparent text-primary font-medium max-w-[100px]`}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          disabled={disabled}
        />
        <button
          disabled={disabled}
          onClick={() => onChange(--value)}
          className={`${
            disabled ? "cursor-not-allowed invisible" : "cursor-pointer"
          } text-primary`}
        >
          <Remove fontSize="inherit" className="text-[#333]" />
        </button>
      </div>
    </div>
  );
}
