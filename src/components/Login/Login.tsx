import React, { useEffect, useState } from "react";
import { ForgotPassword } from "./ForgortPassword";
import { ForgotPIN } from "./ForgotPIN";
import { ClientLoginPassword } from "./ClientLoginPassword";
import { useNavigate } from "react-router-dom";
import { ClientLoginPIN } from "./ClientLoginPIN";
import SwitchAccount from "./SwitchAccount";
import { TOKEN } from "../../constants/global";

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem(TOKEN) && navigate("/");
  }, [navigate]);

  const [loginFlowCurrentState, setLoginFlowCurrentState] = useState(
    "clientLoginPassword"
  );

  const LoginFlow = {
    clientLoginPassword: (
      <ClientLoginPassword
        setLoginFlowCurrentState={setLoginFlowCurrentState}
      />
    ),
    clientLoginPIN: (
      <ClientLoginPIN setLoginFlowCurrentState={setLoginFlowCurrentState} />
    ),
    forgotPassword: (
      <ForgotPassword setLoginFlowCurrentState={setLoginFlowCurrentState} />
    ),
    forgotPIN: (
      <ForgotPIN setLoginFlowCurrentState={setLoginFlowCurrentState} />
    ),
    switchAccount: (
      <SwitchAccount setLoginFlowCurrentState={setLoginFlowCurrentState} />
    ),
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="rounded-3xl shadow-xl p-10 w-[540px] max-w-[540px] h-[540px] max-h-[540px]">
        <div className="flex flex-col gap-[30px] h-full">
          {LoginFlow[loginFlowCurrentState]}
        </div>
      </div>
    </div>
  );
}
