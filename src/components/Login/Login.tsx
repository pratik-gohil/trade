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
  const [userID, setUserID] = useState("");

  useEffect(() => {
    localStorage.getItem(TOKEN) && navigate("/");
  }, []);

  const [loginFlowCurrentState, setLoginFlowCurrentState] = useState(
    "clientLoginPassword"
  );

  const LoginFlow = {
    clientLoginPassword: (
      <ClientLoginPassword
        setLoginFlowCurrentState={setLoginFlowCurrentState}
        setUserID={setUserID}
      />
    ),
    clientLoginPIN: (
      <ClientLoginPIN
        setLoginFlowCurrentState={setLoginFlowCurrentState}
        userID={userID}
      />
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
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-[30px] h-full"
          >
            {LoginFlow[loginFlowCurrentState]}
          </form>
        </div>
      </div>
    </div>
  );
}
