import React from "react";
import { Add, Remove } from "@mui/icons-material";

export function NumberInput({ label, value, onChange, disabled = false }) {
  return (
    <div
      className={`relative border border-solid border-gray-300 px-3 rounded-lg ${
        disabled ? "input-disabled cursor-not-allowed" : ""
      }`}
    >
      <span className="text-xs bg-white text-secondary absolute -top-2 left-2.5">
        {label}
      </span>
      <div className="flex py-1.5">
        <button
          disabled={disabled}
          onClick={() => onChange(value + 1)}
          className={`${
            disabled ? "cursor-not-allowed invisible" : "cursor-pointer"
          } text-primary`}
        >
          <Add fontSize="inherit" />
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
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
        />
        <button
          disabled={disabled}
          onClick={() => onChange(value - 1)}
          className={`${
            disabled ? "cursor-not-allowed invisible" : "cursor-pointer"
          } text-primary`}
        >
          <Remove fontSize="inherit" />
        </button>
      </div>
    </div>
  );
}
