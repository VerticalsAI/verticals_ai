import { Connection } from "@solana/web3.js";

import {
  EVMGetTokenAddressAction,
  EVMLiquidStakingYieldsAction,
  SolanaDepositAction,
} from "@/ai/sei/actions";

import {
  EVM_LIQUID_STAKING_YIELDS_NAME,
  SOLANA_DEPOSIT_NAME,
  SOLANA_GET_TOKEN_ADDRESS_NAME,
} from "@/ai/action-names";
import { evmTool } from "@/ai/sei";

export const STAKING_TOOLS = {
  [`staking-${SOLANA_DEPOSIT_NAME}`]: evmTool(
    new SolanaDepositAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${EVM_LIQUID_STAKING_YIELDS_NAME}`]: evmTool(
    new EVMLiquidStakingYieldsAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${SOLANA_GET_TOKEN_ADDRESS_NAME}`]: evmTool(
    new EVMGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
