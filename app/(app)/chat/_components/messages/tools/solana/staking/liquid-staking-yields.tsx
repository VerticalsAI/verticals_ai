import LoginButton from "@/app/(app)/_components/log-in-button";
import React, { useEffect, useState } from "react";
import ToolCard from "../../tool-card";

import type {
  LiquidStakingYieldsResultBodyType,
  LiquidStakingYieldsResultType,
} from "@/ai";
import { useChat } from "@/app/(app)/chat/_contexts/chat";
import { Card } from "@/components/ui";
import { usePrivy, Wallet } from "@privy-io/react-auth";
import type { ToolInvocation } from "ai";

import WalletAddress from "@/app/_components/wallet-address";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import Image from "next/image";

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const LiquidStakingYieldsTool: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Best Liquid Staking Yields...`}
      result={{
        heading: (result: LiquidStakingYieldsResultType) =>
          result.body
            ? `Fetched Best Liquid Staking Yields`
            : "No staking yields found",
        body: (result: LiquidStakingYieldsResultType) =>
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
  body: LiquidStakingYieldsResultBodyType;
}) => {
  const [showAll, setShowAll] = useState(false);

  console.log(body);

  return (
    <Card className="flex flex-col gap-2 p-2 w-full">
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">Asset</TableHead>
            <TableHead className="text-center">Token</TableHead>
            <TableHead className="text-center">Supply APY</TableHead>
            <TableHead className="text-center">Borrow APY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.data.slice(0, showAll ? body.data.length : 10).map((yd) => {
            if (!yd.tokenData) {
              return null;
            }
            return (
              <TableRow key={yd.tokenData.id}>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Image
                      src={yd.tokenData.logoURI}
                      alt={yd.tokenData.symbol}
                      width={24}
                      height={24}
                      unoptimized
                      className="rounded-full"
                    />
                    {yd.tokenData.symbol.toUpperCase()}
                  </div>
                </TableCell>
                <TableCell className="flex flex-col items-center">
                  <WalletAddress
                    address={yd.tokenData.id}
                    className="font-medium"
                  />
                </TableCell>
                <TableCell className="text-green-500">
                  {(parseFloat(yd.supplyApy) * 100).toFixed(2)}%
                </TableCell>
                <TableCell className="text-green-500">
                  {(parseFloat(yd.borrowApy) * 100).toFixed(2)}%
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

export default LiquidStakingYieldsTool;
