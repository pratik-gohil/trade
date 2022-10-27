import { FormControlLabel } from "@mui/material";
import { useState } from "react";
import CustomCheckbox from "../Checkbox/Checkbox";
import { validateUser } from "../../http/validateUser/validateUser";
import { PasswordInput } from "../PasswordInput";

export function ClientLoginPassword({
  setLoginFlowCurrentState,
  setUserID: setUserIDGlobal,
}) {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const handlevalidateUser = async () => {
    const data = await validateUser({
      userID: userID,
      password: password,
    });

    if (data.type === "success") {
      setUserIDGlobal(data.result.userID);
      setLoginFlowCurrentState("clientLoginPIN");
    }
  };

  return (
    <>
      <h1 className="text-3xl text-[#41414e] font-semibold">
        Login to Trade.com
      </h1>

      <input
        placeholder="User ID"
        className="outline-none border border-border rounded-lg p-3 text-xl"
        value={userID}
        onChange={(e) => setUserID(e.target.value.toUpperCase())}
      />
      <PasswordInput
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-3">
        <FormControlLabel
          sx={{
            fontSize: "12px",
            margin: 0,
            display: "flex",
            gap: 0.5,
          }}
          control={<CustomCheckbox />}
          label={
            <span className="text-xs text-[#41414e] cursor-pointer">
              Save Account
            </span>
          }
        />
      </div>
      <div className="flex flex-col gap-[30px] justify-center items-center mt-auto">
        <button
          onClick={handlevalidateUser}
          className="bg-blue-gradient rounded-lg p-[10px] text-white font-semibold w-[360px]"
        >
          LOGIN
        </button>
        <span
          onClick={() => setLoginFlowCurrentState("forgotPassword")}
          className="text-lg underline text-[#41414e] cursor-pointer"
        >
          Forgot Password?
        </span>
      </div>
    </>
  );
}
