import { Connection } from "@solana/web3.js";

import {
  EthereumGetTokenAddressAction,
  EthereumLiquidStakingYieldsAction,
  SolanaDepositAction,
} from "@/ai/ethereum/actions";

import {
  ETHEREUM_LIQUID_STAKING_YIELDS_NAME,
  SOLANA_DEPOSIT_NAME,
  SOLANA_GET_TOKEN_ADDRESS_NAME,
} from "@/ai/action-names";
import { ethereumTool } from "@/ai/ethereum";

export const STAKING_TOOLS = {
  [`staking-${SOLANA_DEPOSIT_NAME}`]: ethereumTool(
    new SolanaDepositAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${ETHEREUM_LIQUID_STAKING_YIELDS_NAME}`]: ethereumTool(
    new EthereumLiquidStakingYieldsAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`staking-${SOLANA_GET_TOKEN_ADDRESS_NAME}`]: ethereumTool(
    new EthereumGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
