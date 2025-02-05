import { Connection } from "@solana/web3.js";

import {
  SolanaDepositAction,
  SolanaGetTokenAddressAction,
  SolanaLiquidStakingYieldsAction,
} from "@/ai/evm/actions";

import {
  SOLANA_DEPOSIT_NAME,
  SOLANA_GET_TOKEN_ADDRESS_NAME,
  SOLANA_LIQUID_STAKING_YIELDS_NAME,
} from "@/ai/action-names";
import { solanaTool } from "@/ai/evm";

export const STAKING_TOOLS = {
  [`staking-${SOLANA_DEPOSIT_NAME}`]: solanaTool(
    new SolanaDepositAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${SOLANA_LIQUID_STAKING_YIELDS_NAME}`]: solanaTool(
    new SolanaLiquidStakingYieldsAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${SOLANA_GET_TOKEN_ADDRESS_NAME}`]: solanaTool(
    new SolanaGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
