import { ArrowBack, DeleteOutline } from "@mui/icons-material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUserReducer } from "../../features/Auth/Auth";
import { PasswordInput } from "../PasswordInput/PasswordInput";

export default function ClientLogin({
  setForgotPassword,
  setForgotPIN,
  setUserID,
}) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [PIN, setPIN] = useState("");
  const [switchAccount, setSwitchAccount] = useState(false);

  return (
    <>
      {user ? (
        switchAccount ? (
          <>
            <h1 className="text-3xl text-[#41414e] font-semibold">
              <span
                className="mr-4 cursor-pointer"
                onClick={() => setSwitchAccount(false)}
              >
                <ArrowBack />
              </span>
              Switch Account
            </h1>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="rounded-full bg-blue-gradient text-white w-10 h-10 text-center text-lg font-medium flex justify-center items-center">
                    {user.firstName[0] + user.lastName[0]}
                  </div>
                  <div>
                    <div className="text-lg text-[#41414e] font-semibold">
                      {user.firstName} {user.lastName}
                    </div>
                    <div>{user.id}</div>
                  </div>
                </div>
                <div className="cursor-pointer text-[#41414e]">
                  <DeleteOutline />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="rounded-full bg-blue-gradient text-white w-10 h-10 text-center text-lg font-medium flex justify-center items-center">
                    {user.firstName[0] + user.lastName[0]}
                  </div>
                  <div>
                    <div className="text-lg text-[#41414e] font-semibold">
                      {user.firstName} {user.lastName}
                    </div>
                    <div>{user.id}</div>
                  </div>
                </div>
                <div className="cursor-pointer text-[#41414e]">
                  <DeleteOutline />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="rounded-full bg-blue-gradient text-white w-10 h-10 text-center text-lg font-medium flex justify-center items-center">
                    {user.firstName[0] + user.lastName[0]}
                  </div>
                  <div>
                    <div className="text-lg text-[#41414e] font-semibold">
                      {user.firstName} {user.lastName}
                    </div>
                    <div>{user.id}</div>
                  </div>
                </div>
                <div className="cursor-pointer text-[#41414e]">
                  <DeleteOutline />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="rounded-full bg-blue-gradient text-white w-10 h-10 text-center text-lg font-medium flex justify-center items-center">
                    {user.firstName[0] + user.lastName[0]}
                  </div>
                  <div>
                    <div className="text-lg text-[#41414e] font-semibold">
                      {user.firstName} {user.lastName}
                    </div>
                    <div>{user.id}</div>
                  </div>
                </div>
                <div className="cursor-pointer text-[#41414e]">
                  <DeleteOutline />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="rounded-full bg-blue-gradient text-white w-10 h-10 text-center text-lg font-medium flex justify-center items-center">
                    {user.firstName[0] + user.lastName[0]}
                  </div>
                  <div>
                    <div className="text-lg text-[#41414e] font-semibold">
                      {user.firstName} {user.lastName}
                    </div>
                    <div>{user.id}</div>
                  </div>
                </div>
                <div className="cursor-pointer text-[#41414e]">
                  <DeleteOutline />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="rounded-full bg-blue-gradient text-white w-10 h-10 text-center text-lg font-medium flex justify-center items-center">
                    {user.firstName[0] + user.lastName[0]}
                  </div>
                  <div>
                    <div className="text-lg text-[#41414e] font-semibold">
                      {user.firstName} {user.lastName}
                    </div>
                    <div>{user.id}</div>
                  </div>
                </div>
                <div className="cursor-pointer text-[#41414e]">
                  <DeleteOutline />
                </div>
              </div>
            </div>
            <button className="bg-blue-gradient text-white rounded-lg p-[10px] font-semibold">
              Add Account
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-[#41414e] font-semibold">
              <span
                className="mr-4 cursor-pointer"
                onClick={() => dispatch(setUserReducer(null))}
              >
                <ArrowBack />
              </span>
              Login to Trade.com
            </h1>

            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="rounded-full bg-blue-gradient text-white w-10 h-10 text-center text-lg font-medium flex justify-center items-center">
                  {user.firstName[0] + user.lastName[0]}
                </div>
                <div>
                  <div className="text-lg text-[#41414e] font-semibold">
                    {user.firstName} {user.lastName}
                  </div>
                  <div>{user.id}</div>
                </div>
              </div>
              <div
                onClick={() => setSwitchAccount(true)}
                className="text-blue underline underline-offset-1 cursor-pointer"
              >
                Switch Account
              </div>
            </div>
            <PasswordInput
              placeholder="Enter PIN"
              value={PIN}
              onChange={(e) => {
                console.log(e.target.value);
                setPIN(e.target.value);
              }}
            />
            <div
              className="flex flex-col gap-[30px] justify-center
           items-center mt-auto"
            >
              <button className="bg-blue-gradient rounded-lg p-[10px] text-white font-semibold w-[360px]">
                LOGIN
              </button>
              {/* <Link to="/forgot-password"> */}
              <span
                className="text-lg underline text-[#41414e] cursor-pointer"
                onClick={() => setForgotPIN(true)}
              >
                Forgot PIN?
              </span>
              {/* </Link> */}
            </div>
          </>
        )
      ) : (
        <>
          <h1 className="text-3xl text-[#41414e] font-semibold">
            Login to Trade.com
          </h1>

          <input
            placeholder="User ID"
            className="outline-none border border-border rounded-lg p-3 text-xl"
            onChange={(e) => setUserID(e.target.value)}
          />
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-1">
            <input type="checkbox" id="login-page-save-account" />
            <label
              htmlFor="login-page-save-account"
              className="text-xs text-[#41414e] cursor-pointer"
            >
              Save Account
            </label>
          </div>
          <div
            className="flex flex-col gap-[30px] justify-center
           items-center mt-auto"
          >
            <button
              onClick={() =>
                dispatch(
                  setUserReducer({
                    id: "LPK007",
                    firstName: "Pratik",
                    lastName: "Gohil",
                  })
                )
              }
              className="bg-blue-gradient rounded-lg p-[10px] text-white font-semibold w-[360px]"
            >
              LOGIN
            </button>
            {/* <Link to="/forgot-pin"> */}
            <span
              className="text-lg underline text-[#41414e] cursor-pointer"
              onClick={() => setForgotPassword(true)}
            >
              Forgot Password?
            </span>
            {/* </Link> */}
          </div>
        </>
      )}
    </>
  );
}

export function ForgotPassword({ setForgotPassword, setUserID }) {
  const [OTP, setOTP] = useState("");
  const [OTPGenerated, setOTPGenerated] = useState(false);
  const [OTPVerified, setOTPVerified] = useState(false);
  const generateOTP = () => {
    setOTPGenerated(true);
  };
  const verifyOTP = () => {
    setOTPVerified(true);
  };
  return (
    <>
      <h1 className="text-3xl text-[#41414e] font-semibold">
        <span
          className="mr-4 cursor-pointer"
          onClick={() => setForgotPassword(false)}
        >
          <ArrowBack />
        </span>
        {OTPVerified ? "Set Password" : "Forgot Password"}
      </h1>

      {OTPVerified ? (
        <>
          <span className="text-[#41414e] text-xs">
            Password must contain one special character
          </span>
          <input
            placeholder="New Password"
            className="outline-none border border-border rounded-lg p-3 text-xl"
          />
          <input
            placeholder="Confirm Password"
            className="outline-none border border-border rounded-lg p-3 text-xl"
          />
          <button className="bg-blue-gradient text-white rounded-lg p-[10px] font-semibold m-[76px] mt-auto">
            Submit
          </button>
        </>
      ) : OTPGenerated ? (
        <>
          <span className="text-[#41414e] text-xs">
            {OTPGenerated
              ? "An OTP has been sent on mobile number XXXXXXX2040 and on your email ID XXXXXXXXdhav@gmail.com"
              : "Don’t worry! We will reset your Password in few seconds"}
          </span>
          <div>
            <span className="text-sm text-[#8c8c8c]">Enter OTP</span>
            <OtpInput
              isInputNum
              value={OTP}
              onChange={(otp) => setOTP(otp)}
              numInputs={6}
              containerStyle="flex gap-[30px] max-w-full mt-[20px] flex-grow-0 flex-shrink basis-0"
              inputStyle="bg-blueHighlight w-[52px] h-[52px] max-w-[52px] max-h-[52px] !w-full outline-none text-center rounded-lg text-lg text-[#41414e] font-medium"
            />
          </div>
          <button
            onClick={verifyOTP}
            className="bg-blue-gradient text-white rounded-lg p-[10px] font-semibold m-[76px] mt-auto"
          >
            Verify OTP
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="User ID"
            className="outline-none border border-border rounded-lg p-3 text-xl"
            onChange={(e) => setUserID(e.target.value)}
          />
          <button
            onClick={generateOTP}
            className="bg-blue-gradient text-white rounded-lg p-[10px] font-semibold m-[76px] mt-auto"
          >
            Get OTP
          </button>
        </>
      )}
    </>
  );
}
export function ForgotPIN({ setForgotPIN, setUserID }) {
  return (
    <>
      <h1 className="text-3xl text-[#41414e] font-semibold">
        <span
          className="mr-4 cursor-pointer"
          onClick={() => setForgotPIN(false)}
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
        onChange={(e) => setUserID(e.target.value)}
      />
      <button className="bg-blue-gradient text-white rounded-lg p-[10px] font-semibold m-[76px] mt-auto">
        Get OTP
      </button>
    </>
  );
}

export function Login() {
  const [userID, setUserID] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPIN, setForgotPIN] = useState(false);
  // const LoginFLow = [<ClientLogin />];

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="rounded-3xl shadow-xl p-10 w-[540px] max-w-[540px] h-[540px] max-h-[540px]">
        <div className="flex flex-col gap-[30px] h-full">
          {forgotPassword ? (
            <ForgotPassword
              setForgotPassword={setForgotPassword}
              setUserID={setUserID}
            />
          ) : forgotPIN ? (
            <ForgotPIN setForgotPIN={setForgotPIN} setUserID={setUserID} />
          ) : (
            <ClientLogin
              setForgotPassword={setForgotPassword}
              setForgotPIN={setForgotPIN}
              setUserID={setUserID}
            />
          )}
        </div>
      </div>
    </div>
  );
}
