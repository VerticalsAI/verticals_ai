import { knowledgeAgent } from "./knowledge";
import { liquidityAgent } from "./liquidity";
import { marketAgent } from "./market";
import { stakingAgent } from "./staking";
import { tokenAnalysisAgent } from "./token-analysis";
import { tradingAgent } from "./trading";
import { walletAgent } from "./wallet";

export const agents = [
  walletAgent,
  stakingAgent,
  marketAgent,
  tradingAgent,
  knowledgeAgent,
  tokenAnalysisAgent,
  liquidityAgent,
];
