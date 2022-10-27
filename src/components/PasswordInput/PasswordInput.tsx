import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";

export function PasswordInput({
  placeholder,
  value,
  onChange,
  required = true,
}) {
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);

  const togglePasswordMask = () => {
    setPasswordIsMasked((prevState) => !prevState);
  };

  return (
    <div className="border border-border rounded-lg p-3 text-xl flex justify-between">
      <input
        required={required}
        placeholder={placeholder || "Password"}
        className="outline-none w-full"
        type={passwordIsMasked ? "password" : "text"}
        onChange={onChange}
        value={value}
      />
      {passwordIsMasked ? (
        <VisibilityOff
          className="cursor-pointer"
          onClick={togglePasswordMask}
        />
      ) : (
        <Visibility className="cursor-pointer" onClick={togglePasswordMask} />
      )}
    </div>
  );
}
