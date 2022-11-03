import { ArrowBack, DeleteOutline } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export default function SwitchAccount({ setLoginFlowCurrentState }) {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex flex-col gap-[30px] h-full">
      <h1 className="text-3xl text-[#41414e] font-semibold">
        <span
          onClick={() => setLoginFlowCurrentState("clientLoginPIN")}
          className="mr-4 cursor-pointer"
        >
          <ArrowBack />
        </span>
        Switch Account
      </h1>
      <div className="flex flex-col gap-4">
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
          <div className="cursor-pointer text-[#41414e]">
            <DeleteOutline />
          </div>
        </div>
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
          <div className="cursor-pointer text-[#41414e]">
            <DeleteOutline />
          </div>
        </div>
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
          <div className="cursor-pointer text-[#41414e]">
            <DeleteOutline />
          </div>
        </div>
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
          <div className="cursor-pointer text-[#41414e]">
            <DeleteOutline />
          </div>
        </div>
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
          <div className="cursor-pointer text-[#41414e]">
            <DeleteOutline />
          </div>
        </div>
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
          <div className="cursor-pointer text-[#41414e]">
            <DeleteOutline />
          </div>
        </div>
      </div>
      <button className="bg-blue-gradient text-white rounded-lg p-[10px] font-semibold">
        Add Account
      </button>
    </div>
  );
}
