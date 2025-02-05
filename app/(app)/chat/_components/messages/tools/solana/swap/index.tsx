import React from "react";

import ToolCard from "../../tool-card";

import SwapCard from "./swap-result";

import type { SolanaTradeArgumentsType, SolanaTradeResultType } from "@/ai";
import type { ToolInvocation } from "ai";
import SwapCallBodyEVM from "./call-evm";

interface SwapProps {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const Swap: React.FC<SwapProps> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText="Completing Trade..."
      result={{
        heading: (result: SolanaTradeResultType) =>
          result.body ? "Trade Complete" : "Failed to complete trade",
        body: (result: SolanaTradeResultType) =>
          result.body ? <SwapCard /> : result.message,
      }}
      call={{
        heading: "Swap",
        body: (toolCallId: string, args: SolanaTradeArgumentsType) => (
          <SwapCallBodyEVM toolCallId={toolCallId} args={args} />
        ),
      }}
      defaultOpen={true}
      prevToolAgent={prevToolAgent}
      className="max-w-full"
    />
  );
};

export default Swap;
