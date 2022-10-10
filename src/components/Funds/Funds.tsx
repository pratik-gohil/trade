import React, { useEffect, useState } from "react";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import { ChevronRight } from "@mui/icons-material";
import { getUserBalance } from "../../http/userBalance/userBalance";

function Funds() {
  const [balanceList, setBalanceList] = useState<any[]>([]);
  const fetchUserBalance = async () => {
    const response = await getUserBalance();
    return response;
  };
  useEffect(() => {
    fetchUserBalance().then((res) => setBalanceList(res.result.BalanceList));
  }, []);

  const { cashAvailable, marginUtilized, netMarginAvailable } = balanceList?.[0]
    ?.limitObject?.RMSSubLimits || {
    cashAvailable: 0,
    marginUtilized: 0,
    netMarginAvailable: 0,
  };
  return (
    <div className="p-5 flex gap-5">
      <div>
        <h1
          className="mb-6 text-2xl font-semibold
        "
        >
          Funds
        </h1>
        <div className="border rounded-md px-5">
          <div className="flex flex-col gap-6 px-2.5 border-b py-6">
            <div>
              <div className="text-primary font-light">
                Available margin (Cash + Collateral)
              </div>
              <div className="text-primary text-4xl">{netMarginAvailable}</div>
            </div>
            <div className="flex gap-[75px]">
              <div>
                <div className="text-xl text-secondary">Available Cash</div>
                <div className="text-2xl text-primary">{cashAvailable}</div>
              </div>
              <div>
                <div className="text-xl text-secondary">Used Margin</div>
                <div className="text-2xl text-primary">{marginUtilized}</div>
              </div>
              <div>77%</div>
            </div>
          </div>
          <div className="flex flex-col gap-5 py-6 border-b">
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Opening Balance</div>
              <div className="text-xl text-primary">90.20</div>
            </div>
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Opening Balance</div>
              <div className="text-xl text-primary">90.20</div>
            </div>
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Opening Balance</div>
              <div className="text-xl text-primary">90.20</div>
            </div>
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Opening Balance</div>
              <div className="text-xl text-primary">90.20</div>
            </div>
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Opening Balance</div>
              <div className="text-xl text-primary">90.20</div>
            </div>
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Opening Balance</div>
              <div className="text-xl text-primary">90.20</div>
            </div>
          </div>
          <div className="flex flex-col gap-5 py-6">
            <div className="flex justify-between">
              <div className="text-lg text-blue underline underline-offset-4">
                Increase your collateral by pledging shares
              </div>
              <div className="text-blue border border-blue rounded-full text-xxs w-4 h-4 text-center leading-3">
                <ArrowOutward fontSize="inherit" color="inherit" />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Opening Balance</div>
              <div className="text-xl text-primary">90.20</div>
            </div>
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Opening Balance</div>
              <div className="text-xl text-primary">90.20</div>
            </div>
            <div className="flex justify-between">
              <div className="text-lg text-secondary">Opening Balance</div>
              <div className="text-xl text-primary">90.20</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h1
            className="mb-6 text-2xl font-semibold
        "
          >
            Top up
          </h1>
          <div className="border rounded-md p-5 flex flex-col items-center gap-2.5">
            <div className="text-lg text-secondary">Enter Amount</div>
            <div className="text-3xl text-primary font-medium py-3.5 bg-blueHighlight rounded-md self-stretch text-center">
              260.00
            </div>
            <div className="flex gap-2.5">
              <span className="text-xs text-secondary bg-secondaryHighlight px-3.5">
                +5000
              </span>
              <span className="text-xs text-secondary bg-secondaryHighlight px-3.5">
                +5000
              </span>
              <span className="text-xs text-secondary bg-secondaryHighlight px-3.5">
                +5000
              </span>
              <span className="text-xs text-secondary bg-secondaryHighlight px-3.5">
                +5000
              </span>
            </div>
            <div className="bg-blue text-white py-2.5 text-2xl font-medium rounded-md self-stretch text-center mt-[22px]">
              Add Funds
            </div>
          </div>
        </div>
        <div>
          <h1
            className="my-6 text-2xl font-semibold
        "
          >
            Funds Report
          </h1>
          <div className="border rounded-md px-5">
            <div className="flex justify-between items-center border-b">
              <div className="text-primary py-4">Withdraw Money</div>
              <div className="text-blue">
                <ChevronRight color="inherit" />
              </div>
            </div>
            <div className="flex justify-between items-center border-b">
              <div className="text-primary py-4">Withdraw Money</div>
              <div className="text-blue">
                <ChevronRight color="inherit" />
              </div>
            </div>
            <div className="flex justify-between items-center border-b">
              <div className="text-primary py-4">Withdraw Money</div>
              <div className="text-blue">
                <ChevronRight color="inherit" />
              </div>
            </div>
            <div className="flex justify-between items-center border-b">
              <div className="text-primary py-4">Withdraw Money</div>
              <div className="text-blue">
                <ChevronRight color="inherit" />
              </div>
            </div>
            <div className="flex justify-between items-center border-b">
              <div className="text-primary py-4">Withdraw Money</div>
              <div className="text-blue">
                <ChevronRight color="inherit" />
              </div>
            </div>
            <div className="flex justify-between items-center border-b">
              <div className="text-primary py-4">Withdraw Money</div>
              <div className="text-blue">
                <ChevronRight color="inherit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Funds;
