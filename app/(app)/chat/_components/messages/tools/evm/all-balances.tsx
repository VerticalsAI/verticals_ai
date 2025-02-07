import React from "react";

import ToolCard from "../tool-card";

import { AllBalancesEVMResultType } from "@/ai/sei";
import type { ToolInvocation } from "ai";
import { TokenBalance } from "../utils";

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const AllEVMBalances: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting All Balances...`}
      result={{
        heading: (result: AllBalancesEVMResultType) =>
          result.body ? `Fetched All Balances` : `Failed to fetch balances`,
        body: (result: AllBalancesEVMResultType) =>
          result.body ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {result.body.balances.map(balance => (
                <TokenBalance
                  key={balance.token}
                  token={balance.token}
                  balance={balance.balance}
                  logoURI={balance.logoURI}
                  name={balance.name}
                />
              ))}
            </div>
          ) : (
            "No balance found"
          ),
      }}
      prevToolAgent={prevToolAgent}
    />
  );
};

export default AllEVMBalances;
