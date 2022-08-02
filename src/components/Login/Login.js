import React from "react";
import { Link } from "react-router-dom";
import { PasswordInput } from "../PasswordInput/PasswordInput";

export function Login() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="rounded-3xl shadow-xl p-10 w-[540px] max-w-[540px]">
        <div className="flex flex-col gap-[30px]">
          <h1 className="text-3xl text-[#41414e] font-semibold">
            Login to Trade.com
          </h1>
          <input
            placeholder="User ID"
            className="outline-none border border-border rounded-lg p-3 text-xl"
          />
          <PasswordInput placeholder="Password" />
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
           items-center"
          >
            <button className="bg-blue-gradient rounded-lg p-[10px] text-white font-semibold w-[360px]">
              LOGIN
            </button>
            <Link to="/forgot-password">
              <span className="text-lg underline text-[#41414e]">
                Forgot Password?
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
