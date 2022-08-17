import React, { useEffect, useState } from "react";
import { ForgotPassword } from "./ForgortPassword";
import { ForgotPIN } from "./ForgotPIN";
import { ClientLoginPassword } from "./ClientLoginPassword";
import { useNavigate } from "react-router-dom";
import { ClientLoginPIN } from "./ClientLoginPIN";
import SwitchAccount from "./SwitchAccount";
import trade from "../../assets/trade.png";
import lkpPNG from "../../assets/lkp.png";
import lkpSVG from "../../assets/lkp.svg";
import { constants } from "../../constants/global";
const { TOKEN } = constants;

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
    <div className="h-screen w-screen">
      <h1 className="flex justify-between p-5">
        <img src={lkpSVG} className="h-[19px] w-[53px]" />
        <img src={trade} className="w-[170px]" />
      </h1>
      <div className="flex justify-center h-full">
        <div className="rounded-3xl shadow-custom p-10 w-[540px] max-w-[540px] h-[80%] max-h-[80%]">
          <div className="flex flex-col gap-[30px] h-full">
            {LoginFlow[loginFlowCurrentState]}
          </div>
        </div>
      </div>
    </div>
  );
}
