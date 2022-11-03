import { Close } from "@mui/icons-material";
import { useState } from "react";
import { validateUser } from "../../http/validateUser/validateUser";
import { PasswordInput } from "../PasswordInput";

export function ClientLoginPassword({
  setLoginFlowCurrentState,
  setUserID: setUserIDGlobal,
}) {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlevalidateUser = async (e) => {
    e.preventDefault();
    const data = await validateUser({
      userID: userID,
      password: password,
    });

    if (data.type === "success") {
      setUserIDGlobal(data.result.userID);
      setLoginFlowCurrentState("clientLoginPIN");
    }

    if (data.type === "error") {
      setError(data.description);
    }
  };

  return (
    <form
      onSubmit={handlevalidateUser}
      className="flex flex-col gap-[30px] h-full"
    >
      <h1 className="text-3xl text-[#41414e] font-semibold">
        Login to Trade.com
      </h1>

      <input
        placeholder="User ID"
        className="outline-none border border-border rounded-lg p-3 text-xl"
        value={userID}
        onChange={(e) => setUserID(e.target.value.toUpperCase())}
        autoFocus
        required
      />
      <PasswordInput
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex flex-col gap-[30px] justify-center items-center mt-auto">
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
          onClick={() => setLoginFlowCurrentState("forgotPassword")}
          className="text-lg underline text-[#41414e] cursor-pointer"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
}
