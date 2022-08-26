import React, { useId } from "react";
import { Add, Remove } from "@mui/icons-material";

export function NumberInput({
  label,
  value,
  onChange,
  disabled = false,
  autoFocus = false,
  step = 1,
  pattern = "",
  min = 1,
  max = Infinity,
}) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={`h-[45px] text-[#8c8c8c] flex items-center relative border border-solid border-gray-300 px-3 rounded-lg ${
        disabled ? "input-disabled cursor-not-allowed" : ""
      }`}
    >
      <span className="text-xs bg-white text-[#8c8c8c] absolute -top-2 left-2.5 px-1">
        {label}
      </span>
      <div className="flex">
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            parseFloat(value) + step <= max &&
              onChange(parseFloat((parseFloat(value) + step).toFixed(2)));
          }}
          className={`${
            disabled ? "cursor-not-allowed invisible" : "cursor-pointer"
          } text-primary`}
        >
          <Add fontSize="inherit" className="text-[#333]" />
        </button>

        <input
          id={id}
          pattern={pattern}
          type="number"
          placeholder=""
          autoCorrect="off"
          min={min}
          max={max}
          autoFocus={autoFocus}
          className={`${
            disabled ? "cursor-not-allowed" : ""
          } outline-0 text-center bg-transparent text-primary font-medium w-[100px] max-w-[100px]`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          step={step}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            parseFloat(value) - step >= min &&
              onChange(parseFloat((parseFloat(value) - step).toFixed(2)));
          }}
          className={`${
            disabled ? "cursor-not-allowed invisible" : "cursor-pointer"
          } text-primary`}
        >
          <Remove fontSize="inherit" className="text-[#333]" />
        </button>
      </div>
    </label>
  );
}
