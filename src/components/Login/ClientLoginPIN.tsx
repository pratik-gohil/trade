import { ArrowBack } from "@mui/icons-material";
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
  const user = useSelector((state: RootState) => state.auth.user);
  const [PIN, setPIN] = useState("");
  const navigate = useNavigate();

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
    } else {
      return;
    }
  };

  return (
    <>
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
        <div className="flex gap-4">
          <div className="rounded-full bg-blue-gradient text-white w-10 h-10 text-center text-lg font-medium flex justify-center items-center">
            {/* {user?.firstName[0] + user?.lastName[0]} */}
          </div>
          <div>
            <div className="text-lg text-[#41414e] font-semibold">
              {user?.ClientName}
            </div>
            <div>{user?.ClientId}</div>
          </div>
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
        <button
          onClick={async () =>
            await handleValidatePIN().then(() => {
              navigate("/");
              navigate(0);
            })
          }
          className="bg-blue-gradient rounded-lg p-[10px] text-white font-semibold w-[360px]"
        >
          LOGIN
        </button>
        <span
          onClick={() => setLoginFlowCurrentState("forgotPIN")}
          className="text-lg underline text-[#41414e] cursor-pointer"
        >
          Forgot PIN?
        </span>
      </div>
    </>
  );
};
