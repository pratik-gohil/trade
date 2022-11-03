import { ArrowBack, Close } from "@mui/icons-material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { constants } from "../../constants/global";
import { validatePIN } from "../../http/validatePIN/validatePIN";
import { asyncLocalStorage } from "../../utils/asyncLocalStorage";
import { PasswordInput } from "../PasswordInput";
const { CLIENT_CODES, CLIENT_ID, TOKEN, USER_ID } = constants;

export const ClientLoginPIN = ({ setLoginFlowCurrentState, userID }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [PIN, setPIN] = useState("");
  const [error, setError] = useState("");

  const handleValidatePIN = async () => {
    const data = await validatePIN({
      userID,
      pin: PIN,
      source: "EnterpriseWeb",
    });

    if (data.type === "success") {
      asyncLocalStorage.setItem(TOKEN, data.result.token);
      asyncLocalStorage.setItem(CLIENT_CODES, data.result.clientCodes);
      asyncLocalStorage.setItem(USER_ID, data.result.userID);
      asyncLocalStorage.setItem(CLIENT_ID, data.result.userID);

      return true;
    } else if (data.type === "error") {
      setError(data.description);
      return false;
    } else {
      return false;
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleValidatePIN().then((res) => {
          if (res) {
            navigate(0);
          }
        });
      }}
      className="flex flex-col gap-[30px] h-full"
    >
      <h1 className="text-3xl text-[#41414e] font-semibold">
        <span
          className="mr-4 cursor-pointer"
          onClick={() => setLoginFlowCurrentState("clientLoginPassword")}
        >
          <ArrowBack />
        </span>
        Login to Trade.com
      </h1>

      <div className="flex justify-between items-center">
        <div className="flex justify-between gap-4">
          <div className="rounded-full bg-blue-gradient text-white w-10 h-10 text-center text-lg font-medium flex justify-center items-center">
            {userID[0]}
          </div>
          <div className="text-lg text-[#41414e] font-semibold">{userID}</div>
        </div>
        <div
          onClick={() => setLoginFlowCurrentState("switchAccount")}
          className="text-blue underline underline-offset-1 cursor-pointer"
        >
          Switch Account
        </div>
      </div>
      <PasswordInput
        placeholder="Enter PIN"
        value={PIN}
        onChange={(e) => {
          setPIN(e.target.value);
        }}
      />
      <div
        className="flex flex-col gap-[30px] justify-center
            items-center mt-auto"
      >
        {error && (
          <div className="flex justify-between text-xs font-medium text-primary py-2.5 px-3 bg-failureHighlight w-[360px] rounded">
            <span>{error}</span>
            <span className="bg-white rounded-full w-5 h-5">
              <Close className="text-failure" sx={{ fontSize: "20px" }} />
            </span>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-gradient rounded-lg p-[10px] text-white font-semibold w-[360px]"
        >
          LOGIN
        </button>
        <button
          type="button"
          onClick={() => setLoginFlowCurrentState("forgotPIN")}
          className="text-lg underline text-[#41414e] cursor-pointer"
        >
          Forgot PIN?
        </button>
      </div>
    </form>
  );
};
