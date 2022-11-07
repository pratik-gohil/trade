import React, { useEffect, useState } from "react";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import { ChevronRight, Refresh } from "@mui/icons-material";
import { getUserBalance } from "../../http/userBalance/userBalance";
import AddFundsModal from "./AddFundsModal";
import { toFixedN } from "../../utils/toFixedN";
import AddFundsModalUPI from "./AddFundsModalUPI";
import AddFundsResponseModal from "./AddFundsResponseModal";
import WithdrawFundsModal from "./WithdrawFundsModal";
import { Link } from "react-router-dom";

export function Funds() {
  const [balanceList, setBalanceList] = useState<any[]>([]);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showFundsUPIModal, setShowFundsUPIModal] = useState(false);
  const [amount, setAmount] = useState("0.00");
  const [addFundsResponse, setAddFundsResponse] = useState<
    "success" | "failed" | null
  >(null);
  const [showWithdrawFunds, setShowWithdrawFunds] = useState(false);

  useEffect(() => {
    if (addFundsResponse) {
      setTimeout(() => {
        setAddFundsResponse(null);
      }, 5000);
    }
  }, [addFundsResponse]);

  const fetchUserBalance = () => {
    getUserBalance().then((res) => setBalanceList(res.result.BalanceList));
  };

  useEffect(() => {
    fetchUserBalance();
  }, []);

  const { cashAvailable, marginUtilized, netMarginAvailable } = balanceList?.[0]
    ?.limitObject?.RMSSubLimits || {
    cashAvailable: 0,
    marginUtilized: 0,
    netMarginAvailable: 0,
  };

  return (
    <>
      <div className="py-5 flex justify-center gap-5">
        <div>
          <h1
            className="mb-6 text-2xl font-semibold
        "
          >
            Funds
          </h1>
          <div className="border rounded-md px-5">
            <div className="flex flex-col px-2.5 border-b py-6">
              <div>
                <div className="text-primary font-light">
                  Available margin (Cash + Collateral){" "}
                  <span onClick={fetchUserBalance} className="cursor-pointer">
                    <Refresh className="text-blue" sx={{ fontSize: 16 }} />
                  </span>
                </div>
                <div className="text-primary text-4xl">
                  {toFixedN(netMarginAvailable)}
                </div>
              </div>
              <div className="flex items-end gap-[45px]">
                <div>
                  <div className="text-xl text-secondary">Available Cash</div>
                  <div className="text-2xl text-primary">
                    {toFixedN(cashAvailable)}
                  </div>
                </div>
                <div>
                  <div className="text-xl text-secondary">Used Margin</div>
                  <div className="text-2xl text-primary">
                    {toFixedN(marginUtilized)}
                  </div>
                </div>
                <div
                  className="percentage-pie"
                  style={
                    {
                      "--p": (100 * marginUtilized) / cashAvailable,
                    } as React.CSSProperties
                  }
                >
                  {toFixedN((100 * marginUtilized) / cashAvailable)}%
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 py-6 border-b">
              <div className="flex justify-between">
                <div className="text-lg text-secondary">Opening Balance</div>
                <div className="text-xl text-primary">NA</div>
              </div>
              <div className="flex justify-between">
                <div className="text-lg text-secondary">Payin</div>
                <div className="text-xl text-primary">
                  {balanceList[0]?.limitObject?.marginAvailable?.PayInAmount}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-lg text-secondary">SPAN</div>
                <div className="text-xl text-primary">
                  {
                    balanceList[0]?.limitObject?.marginAvailable
                      ?.CashMarginAvailable
                  }
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-lg text-secondary">Delivery Margin</div>
                <div className="text-xl text-primary">NA</div>
              </div>
              <div className="flex justify-between">
                <div className="text-lg text-secondary">Exposure</div>
                <div className="text-xl text-primary">NA</div>
              </div>
              <div className="flex justify-between">
                <div className="text-lg text-secondary">Option premium</div>
                <div className="text-xl text-primary">
                  {
                    balanceList[0]?.limitObject?.marginAvailable
                      ?.NetOptionPremium
                  }
                </div>
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
                <div className="text-lg text-secondary">
                  Collateral (Liquid funds)
                </div>
                <div className="text-xl text-primary">NA</div>
              </div>
              <div className="flex justify-between">
                <div className="text-lg text-secondary">
                  Collateral (Equity)
                </div>
                <div className="text-xl text-primary">NA</div>
              </div>
              <div className="flex justify-between">
                <div className="text-lg text-secondary">Total collateral</div>
                <div className="text-xl text-primary">
                  {balanceList[0]?.limitObject?.RMSSubLimits?.collateral}
                </div>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowAddFundsModal(true);
              }}
              className="border rounded-md p-5 flex flex-col items-center gap-2.5"
            >
              <div className="text-lg text-secondary">Enter Amount</div>
              <input
                required
                className="text-3xl text-primary font-medium py-3.5 bg-blueHighlight rounded-md self-stretch text-center"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="flex gap-2.5">
                <span
                  onClick={() =>
                    setAmount((amount) => `${Number(amount) + 5000}`)
                  }
                  className="text-xs text-secondary bg-secondaryHighlight px-3.5 cursor-pointer"
                >
                  +5000
                </span>
                <span
                  onClick={() =>
                    setAmount((amount) => `${Number(amount) + 10000}`)
                  }
                  className="text-xs text-secondary bg-secondaryHighlight px-3.5 cursor-pointer"
                >
                  +10000
                </span>
                <span
                  onClick={() =>
                    setAmount((amount) => `${Number(amount) + 50000}`)
                  }
                  className="text-xs text-secondary bg-secondaryHighlight px-3.5 cursor-pointer"
                >
                  +50000
                </span>
                <span
                  onClick={() =>
                    setAmount((amount) => `${Number(amount) + 100000}`)
                  }
                  className="text-xs text-secondary bg-secondaryHighlight px-3.5 cursor-pointer"
                >
                  +100000
                </span>
              </div>
              <button
                type="submit"
                className="bg-blue text-white py-2.5 text-2xl font-medium rounded-md self-stretch text-center mt-[22px] cursor-pointer"
              >
                Add Funds
              </button>
            </form>
          </div>
          <div>
            <h1
              className="my-6 text-2xl font-semibold
        "
            >
              Funds Report
            </h1>
            <div className="border rounded-md px-5">
              <div
                className="flex justify-between items-center border-b cursor-pointer"
                onClick={() => setShowWithdrawFunds(true)}
              >
                <div className="text-primary py-4">Withdraw Money</div>
                <div className="text-blue">
                  <ChevronRight color="inherit" />
                </div>
              </div>
              <Link to="ledger">
                <div className="flex justify-between items-center border-b cursor-pointer">
                  <div className="text-primary py-4">View Ledger</div>
                  <div className="text-blue">
                    <ChevronRight color="inherit" />
                  </div>
                </div>
              </Link>
              <Link to="deposits">
                <div className="flex justify-between items-center border-b cursor-pointer">
                  <div className="text-primary py-4">Recent Deposits</div>
                  <div className="text-blue">
                    <ChevronRight color="inherit" />
                  </div>
                </div>
              </Link>
              <Link to="withdrawals">
                <div className="flex justify-between items-center border-b cursor-pointer">
                  <div className="text-primary py-4">Recent Withdrawals</div>
                  <div className="text-blue">
                    <ChevronRight color="inherit" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AddFundsModal
        amount={amount}
        showModal={showAddFundsModal}
        setShowModal={setShowAddFundsModal}
        setShowFundsUPIModal={setShowFundsUPIModal}
        addFundsResponse={addFundsResponse}
        setAddFundsResponse={setAddFundsResponse}
      />
      <AddFundsModalUPI
        showModal={showFundsUPIModal}
        setShowModal={setShowFundsUPIModal}
        amount={amount}
      />
      <AddFundsResponseModal
        addFundsResponse={addFundsResponse}
        setAddFundsResponse={setAddFundsResponse}
        amount={amount}
      />
      <WithdrawFundsModal
        balanceList={balanceList}
        fetchUserBalance={fetchUserBalance}
        showModal={showWithdrawFunds}
        setShowModal={setShowWithdrawFunds}
      />
    </>
  );
}
