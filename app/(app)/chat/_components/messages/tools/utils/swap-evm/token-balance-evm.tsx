"use client";

import { Button } from "@/components/ui";
import useTokenBalanceEvm from "@/hooks/queries/evm/use-token-balance";
import { balanceDisplayer } from "@/hooks/utils/format";
import { Wallet } from "lucide-react";
import React, { memo, useEffect } from "react";
import { useBalance } from "wagmi";

interface Props {
  address: string;
  tokenAddress: string;
  tokenSymbol: string;
  setAmount?: (amount: string) => void;
  digits?: number;
}

const TokenBalanceEVM: React.FC<Props> = ({
  tokenAddress,
  tokenSymbol,
  setAmount,
  address,
}) => {
  //   const { balance, isLoading } = useTokenBalance(tokenAddress, address);
  const { data } = useTokenBalanceEvm(tokenAddress as any);
  const { data: native, refetch } = useBalance({
    address: address as any,
  });
  const balance =
    (tokenAddress === "0x0" ? native?.formatted : data.formatted) || "0";

  useEffect(() => {
    if (tokenAddress === "0x0") {
      const intervalId = setInterval(() => {
        refetch();
      }, 10_000);
      clearInterval(intervalId);
    }
  }, [tokenAddress]);
  // if (isLoading) return <Skeleton className="w-16 h-4" />;
  return (
    <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
      <Wallet className="w-3 h-3" />
      <p className="text-xs">
        {balanceDisplayer(balance)} {tokenSymbol}
      </p>
      {setAmount && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="text-[10px] px-1 py-0.5 h-fit w-fit"
            onClick={() => setAmount((Number(balance) / 2).toString())}
          >
            Half
          </Button>
          <Button
            variant="outline"
            className="text-[10px] px-1 py-0.5 h-fit w-fit"
            onClick={() => setAmount(balance.toString())}
          >
            Max
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(TokenBalanceEVM);
