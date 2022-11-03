import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";

export function ForgotPIN({ setLoginFlowCurrentState }) {
  const [userID, setUserID] = useState("");

  return (
    <form className="flex flex-col gap-[30px] h-full">
      <h1 className="text-3xl text-[#41414e] font-semibold">
        <span
          className="mr-4 cursor-pointer"
          onClick={() => setLoginFlowCurrentState("clientLoginPIN")}
        >
          <ArrowBack />
        </span>
        ForgotPIN
      </h1>
      <span className="text-[#41414e] text-xs">
        Don’t worry! We will reset your PIN in few seconds
      </span>
      <input
        placeholder="User ID"
        className="outline-none border border-border rounded-lg p-3 text-xl"
        value={userID}
        onChange={(e) => setUserID(e.target.value.toUpperCase())}
        autoFocus
        required
      />
      <button className="bg-blue-gradient text-white rounded-lg p-[10px] font-semibold m-[76px] mt-auto">
        Next
      </button>
    </form>
  );
}
