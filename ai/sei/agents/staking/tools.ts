import { Connection } from "@solana/web3.js";

import {
  SeiGetTokenAddressAction,
  SeiLiquidStakingYieldsAction,
  SolanaDepositAction,
} from "@/ai/sei/actions";

import {
  SEI_LIQUID_STAKING_YIELDS_NAME,
  SOLANA_DEPOSIT_NAME,
  SOLANA_GET_TOKEN_ADDRESS_NAME,
} from "@/ai/action-names";
import { seiTool } from "@/ai/sei";

export const STAKING_TOOLS = {
  [`staking-${SOLANA_DEPOSIT_NAME}`]: seiTool(
    new SolanaDepositAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${SEI_LIQUID_STAKING_YIELDS_NAME}`]: seiTool(
    new SeiLiquidStakingYieldsAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${SOLANA_GET_TOKEN_ADDRESS_NAME}`]: seiTool(
    new SeiGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
