import { Connection } from "@solana/web3.js";

import {
  EVMLiquidStakingYieldsAction,
  SolanaDepositAction,
  SolanaGetTokenAddressAction,
} from "@/ai/evm/actions";

import {
  EVM_LIQUID_STAKING_YIELDS_NAME,
  SOLANA_DEPOSIT_NAME,
  SOLANA_GET_TOKEN_ADDRESS_NAME,
} from "@/ai/action-names";
import { solanaTool } from "@/ai/evm";

export const STAKING_TOOLS = {
  [`staking-${SOLANA_DEPOSIT_NAME}`]: solanaTool(
    new SolanaDepositAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${EVM_LIQUID_STAKING_YIELDS_NAME}`]: solanaTool(
    new EVMLiquidStakingYieldsAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${SOLANA_GET_TOKEN_ADDRESS_NAME}`]: solanaTool(
    new SolanaGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
