import { SettingsOutlined } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Divider from "../Divider/Divider";

function Profile() {
  const { ClientName, ClientId } = useSelector(
    (state: RootState) => state.auth.user
  );
  return (
    <div className="p-5">
      <div className="border p-5 rounded-md">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-5xl">{ClientName}</h1>
            <p className="text-base">
              <span className="text-secondary">
                {ClientId} <span>|</span>{" "}
              </span>
              <span className="text-blue cursor-pointer">
                Change Password/PIN
              </span>
            </p>
          </div>
          <div className="bg-secondaryHighlight rounded py-3 px-8">
            <p>
              <span className="text-lg text-primary pr-4">Account Val</span>
              <span className="text-primary text-5xl font-semibold">
                9,79,817.70
              </span>
            </p>
            <Divider margin="10px" />
            <div className="w-full text-center">
              <span className="text-blue text-base font-medium cursor-pointer">
                View Account Value Curve
              </span>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-primary">
              Profile Details
            </h1>
            <div className="text-xs text-blue">
              Manage <SettingsOutlined sx={{ fontSize: "16px" }} />
            </div>
          </div>
          <div className="flex gap-5 py-5">
            <div className="flex justify-between w-full">
              <span className="text-sm text-secondary">Mobile</span>
              <span className="text-lg text-primary">99xxxxx697</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-sm text-secondary">Email</span>
              <span className="text-lg text-primary">
                dhaxxxxxxxxx@gmail.com
              </span>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex justify-between w-full">
              <span className="text-sm text-secondary">PAN</span>
              <span className="text-lg text-primary">BTxxxxx44M</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-sm text-secondary">Segments</span>
              <span className="text-lg text-blue">MF, NSE, BSE</span>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-primary">Bank</h1>
            <div className="text-xs text-blue">
              Manage <SettingsOutlined sx={{ fontSize: "16px" }} />
            </div>
          </div>
          <div className="flex gap-5 py-5">
            <div className="flex justify-between w-full">
              <span className="text-sm text-secondary">Bank</span>
              <span className="text-lg text-primary">ICICI BANK LTD</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-sm text-secondary">Account</span>
              <span className="text-lg text-primary">*4055</span>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex justify-between w-full">
              <span className="text-sm text-secondary">Branch</span>
              <span className="text-lg text-primary">LOWER PAREL, MUMBAI</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-sm text-secondary">UPI ID Linked</span>
              <span className="text-lg text-blue">dummy@icicibank</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
