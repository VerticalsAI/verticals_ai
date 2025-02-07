import { Connection } from "@solana/web3.js";

import {
  SeiGetTokenAddressAction,
  SeiLiquidStakingYieldsAction,
  SolanaDepositAction,
} from "@/ai/sei/actions";

import {
  SEI_DEPOSIT_NAME,
  SEI_GET_TOKEN_ADDRESS_NAME,
  SEI_LIQUID_STAKING_YIELDS_NAME,
} from "@/ai/action-names";
import { seiTool } from "@/ai/sei";

export const STAKING_TOOLS = {
  [`staking-${SEI_DEPOSIT_NAME}`]: seiTool(
    new SolanaDepositAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${SEI_LIQUID_STAKING_YIELDS_NAME}`]: seiTool(
    new SeiLiquidStakingYieldsAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${SEI_GET_TOKEN_ADDRESS_NAME}`]: seiTool(
    new SeiGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
