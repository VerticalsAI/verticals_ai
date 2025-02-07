import LoginButton from "@/app/(app)/_components/log-in-button";
import React, { useEffect, useState } from "react";
import ToolCard from "../../tool-card";

import { useChat } from "@/app/(app)/chat/_contexts/chat";
import { Card } from "@/components/ui";
import { usePrivy, Wallet } from "@privy-io/react-auth";
import type { ToolInvocation } from "ai";

import {
  SeiLiquidStakingYieldsResultBodyType,
  SeiLiquidStakingYieldsResultType,
} from "@/ai/sei";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const LiquidStakingYieldsEVMTool: React.FC<Props> = ({
  tool,
  prevToolAgent,
}) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Best Liquid Staking Yields...`}
      result={{
        heading: (result: SeiLiquidStakingYieldsResultType) =>
          result.body
            ? `Fetched best stablecoin yields`
            : "No staking yields found",
        body: (result: SeiLiquidStakingYieldsResultType) =>
          result.body ? (
            <LiquidStakingYields body={result.body} />
          ) : (
            "No staking yields found"
          ),
      }}
      call={{
        heading: "Connect Wallet",
        body: (toolCallId: string) => (
          <GetTopYieldTokensAction toolCallId={toolCallId} />
        ),
      }}
      prevToolAgent={prevToolAgent}
      className="w-full"
    />
  );
};

const GetTopYieldTokensAction = ({ toolCallId }: { toolCallId: string }) => {
  const { user } = usePrivy();

  const { addToolResult, isLoading } = useChat();

  useEffect(() => {
    if (user?.wallet?.address && !isLoading) {
      addToolResult(toolCallId, {
        message: "Wallet connected",
        body: {
          address: user.wallet.address,
        },
      });
    }
  }, [user, isLoading]);

  const onComplete = (wallet: Wallet) => {
    addToolResult(toolCallId, {
      message: "Wallet connected",
      body: {
        address: wallet.address,
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <LoginButton onComplete={onComplete} />
    </div>
  );
};

const LiquidStakingYields = ({
  body,
}: {
  body: SeiLiquidStakingYieldsResultBodyType;
}) => {
  const [showAll, setShowAll] = useState(false);
  const { sendMessage, isResponseLoading } = useChat();

  const handleCall = (symbol: string) => {
    sendMessage(`Supply ${symbol} to jellyverse`);
  };

  return (
    <Card className="flex flex-col gap-2 p-2 w-full">
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">Asset</TableHead>
            <TableHead className="text-center">Token</TableHead>
            <TableHead className="text-center">Pool</TableHead>
            <TableHead className="text-center">APY</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.data
            .slice(0, showAll ? body.data.length : 10)
            .map((yd, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      {/* <Image
                        src={yd.tokenData.logoURI}
                        alt={yd.tokenData.symbol}
                        width={24}
                        height={24}
                        unoptimized
                        className="rounded-full"
                      /> */}
                      {yd.symbol.toUpperCase()}
                    </div>
                  </TableCell>
                  <TableCell className="">
                    {/* <WalletAddress
                    address={yd.tokenData.id}
                    className="font-medium"
                  /> */}
                    <p
                      className={cn(
                        "text-sm text-muted-foreground cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md w-fit px-1"
                      )}
                    >
                      {`${yd.address.slice(0, 4)}...${yd.address.slice(-4)}`}
                    </p>
                  </TableCell>
                  <TableCell className="">
                    {/* {(parseFloat(yd.supplyApy) * 100).toFixed(2)}% */}
                    {yd.poolSymbol}
                  </TableCell>
                  <TableCell className="text-green-500">
                    {parseFloat(yd.apy).toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-green-500">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        if (yd.symbol) {
                          handleCall(yd.symbol.toLocaleUpperCase());
                        }
                      }}
                      disabled={isResponseLoading}
                    >
                      Supply
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Button variant="ghost" onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Less" : "Show All"}
      </Button>
    </Card>
  );
};

export default LiquidStakingYieldsEVMTool;
