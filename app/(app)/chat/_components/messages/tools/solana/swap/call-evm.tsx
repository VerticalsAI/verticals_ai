"use client";
import { Card } from "@/components/ui";
import React from "react";

import { useChat } from "@/app/(app)/chat/_contexts/chat";

import type { SolanaTradeArgumentsType, SolanaTradeResultBodyType } from "@/ai";
import SwapEVM from "../../utils/swap-evm";

interface Props {
  toolCallId: string;
  args: SolanaTradeArgumentsType;
}

const SwapCallBodyEVM: React.FC<Props> = ({ toolCallId, args }) => {
  const { addToolResult } = useChat();

  const inputTokenData = {
    id: "0x0",
    name: "SEI",
    symbol: "SEI",
    decimals: 18,
    tags: [],
    logoURI:
      "https://raw.githubusercontent.com/Sei-Public-Goods/sei-assetlist/main/images/Sei.png",
    freezeAuthority: null,
    mintAuthority: null,
    permanentDelegate: null,
    extensions: {},
  };

  const outputTokenData = {
    id: "0x3894085ef7ff0f0aedf52e2a2704928d1ec074f1",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    tags: [],
    logoURI:
      "https://raw.githubusercontent.com/Sei-Public-Goods/sei-assetlist/main/images/USDCoin.svg",
    freezeAuthority: null,
    mintAuthority: null,
    permanentDelegate: null,
    extensions: {},
  };

  return (
    <Card className="p-2">
      <SwapEVM
        initialInputToken={inputTokenData}
        initialOutputToken={outputTokenData}
        inputLabel="Sell"
        outputLabel="Buy"
        initialInputAmount={args.inputAmount?.toString()}
        swapText="Swap"
        swappingText="Swapping..."
        onSuccess={(tx) => {
          addToolResult<SolanaTradeResultBodyType>(toolCallId, {
            message: `Swap successful!`,
            body: {
              transaction: tx,
              inputAmount: args.inputAmount || 0,
              inputToken: inputTokenData?.symbol || "",
              outputToken: outputTokenData?.symbol || "",
            },
          });
        }}
        onError={(error) => {
          addToolResult(toolCallId, {
            message: `Swap failed: ${error}`,
          });
        }}
        onCancel={() => {
          addToolResult(toolCallId, {
            message: `Swap cancelled`,
          });
        }}
      />
    </Card>
  );
};

export default SwapCallBodyEVM;
