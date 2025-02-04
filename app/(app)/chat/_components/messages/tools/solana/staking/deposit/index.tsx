import React from "react";

import ToolCard from "../../../tool-card";

import DepositCallBody from "./call";
import DepositResult from "./deposit-result";

import type { DepositArgumentsType, DepositResultType } from "@/ai";
import type { ToolInvocation } from "ai";

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const Deposit: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText="Staking..."
      result={{
        heading: (result: DepositResultType) =>
          result.body ? "Deposit Complete" : "Failed to Deposit",
        body: (result: DepositResultType) =>
          result.body ? <DepositResult /> : result.message,
      }}
      call={{
        heading: "Deposit",
        body: (toolCallId: string, args: DepositArgumentsType) => (
          <DepositCallBody toolCallId={toolCallId} args={args} />
        ),
      }}
      defaultOpen={true}
      prevToolAgent={prevToolAgent}
      className="max-w-full"
    />
  );
};

export default Deposit;
