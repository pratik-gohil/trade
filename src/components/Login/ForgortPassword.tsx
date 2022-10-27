import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import OtpInput from "react-otp-input";

export function ForgotPassword({ setLoginFlowCurrentState }) {
  const [userID, setUserID] = useState("");
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
          onClick={() => setLoginFlowCurrentState("clientLoginPassword")}
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
            value={userID}
            onChange={(e) => setUserID(e.target.value.toUpperCase())}
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
