import React, { useEffect, useState } from "react";

import LoginButton from "@/app/(app)/_components/log-in-button";

import ToolCard from "../tool-card";

import WalletAddress from "@/app/_components/wallet-address";
import { usePrivy, Wallet } from "@privy-io/react-auth";

import { useChat } from "@/app/(app)/chat/_contexts/chat";

import {
  GetTopYieldTokensResultBodyType,
  GetTopYieldTokensResultType,
} from "@/ai/solana/actions/market/get-top-yield-tokens/types";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import type { ToolInvocation } from "ai";

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetTopYieldTokens: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Top Yield Tokens...`}
      result={{
        heading: (result: GetTopYieldTokensResultType) =>
          result.body
            ? `Fetched Top Yield Tokens`
            : "Failed to fetch top yield tokens",
        body: (result: GetTopYieldTokensResultType) =>
          result.body ? (
            <TopYieldTokens body={result.body} />
          ) : (
            "Failed to fetch top yield tokens"
          ),
      }}
      call={{
        heading: "Connect Wallet",
        body: (toolCallId: string) => (
          <GetTopYieldTokensAction toolCallId={toolCallId} />
        ),
      }}
      prevToolAgent={prevToolAgent}
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

const TopYieldTokens = ({
  body,
}: {
  body: GetTopYieldTokensResultBodyType;
}) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <Card className="flex flex-col gap-2 p-2 w-full">
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">Rank</TableHead>
            {/* <TableHead className="text-center">Symbol</TableHead> */}
            <TableHead className="text-center">Token</TableHead>
            <TableHead className="text-center">APY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.tokens
            .slice(0, showAll ? body.tokens.length : 10)
            .map((token, index) => (
              <TableRow key={token.tokenMint}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="flex flex-col items-center">
                  <WalletAddress
                    address={token.tokenMint}
                    className="font-medium"
                  />
                </TableCell>
                <TableCell className="text-green-500">
                  {Math.floor(Number(token.apy) * 100)}%
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button variant="ghost" onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Less" : "Show All"}
      </Button>
    </Card>
  );
};

// const Symbol = ({ address }: { address: string }) => {
//   const { data: portfolio, isLoading: portfolioLoading, } =
//     usePortfolio(address);

//   return (
//     <div>
//       {portfolioLoading ? (
//         <Skeleton className="h-4 w-24" />
//       ) : (
//         portfolio && (
//           <p className="text-xs font-bold">
//             {portfolio.items.find(item => item.address === address)?.symbol}
//           </p>
//         )
//       )}
//     </div>
//   );
// };

export default GetTopYieldTokens;
