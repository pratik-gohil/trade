import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Input, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

export function PasswordInput({ placeholder }) {
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);

  const togglePasswordMask = () => {
    setPasswordIsMasked((prevState) => !prevState);
  };

  return (
    <div className="border border-border rounded-lg p-3 text-xl flex justify-between">
      <input
        placeholder={placeholder || "Password"}
        className="outline-none w-full"
        type={passwordIsMasked ? "password" : "text"}
      />
      {passwordIsMasked ? (
        <Visibility className="cursor-pointer" onClick={togglePasswordMask} />
      ) : (
        <VisibilityOff
          className="cursor-pointer"
          onClick={togglePasswordMask}
        />
      )}
    </div>
  );
}
