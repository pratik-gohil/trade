import React from "react";
import { Add, Remove } from "@mui/icons-material";

export function NumberInput({ label, value, onChange, disabled = false }) {
  return (
    <fieldset
      className={`border border-solid border-gray-300 text-secondary px-3 rounded-lg w-fit ${
        disabled ? "input-disabled cursor-not-allowed" : ""
      }`}
    >
      <legend className="text-sm px-2 bg-white">{label}</legend>
      <div className="mb-[13px]">
        <button
          disabled={disabled}
          onClick={() => onChange(value + 1)}
          className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <Add fontSize="inherit" />
        </button>
        <input
          type="number"
          placeholder=""
          autoCorrect="off"
          min="1"
          autoFocus="autofocus"
          label="Qty."
          className={`${
            disabled ? "cursor-not-allowed" : ""
          } outline-0 text-center w-20 bg-transparent`}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
        />
        <button
          disabled={disabled}
          onClick={() => onChange(value - 1)}
          className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <Remove fontSize="inherit" />
        </button>
      </div>
    </fieldset>
  );
}
