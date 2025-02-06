import { SolanaGetTrendingTokensAction } from "./market";
import { EVMLiquidStakingYieldsAction, SolanaDepositAction } from "./staking";
import {
  SolanaGetTokenAddressAction,
  SolanaGetTokenDataAction,
  SolanaTokenHoldersAction,
  SolanaTopHoldersAction,
} from "./token";
import { SolanaTradeAction } from "./trade";
import {
  SolanaAllBalancesAction,
  SolanaBalanceAction,
  SolanaGetWalletAddressAction,
  SolanaTransferAction,
} from "./wallet";

import type { EVMAction, EVMActionSchemaAny } from "./evm-action";

export function getAllSolanaActions(): EVMAction<EVMActionSchemaAny, any>[] {
  return [
    new SolanaBalanceAction(),
    new SolanaTransferAction(),
    new SolanaTradeAction(),
    new SolanaGetWalletAddressAction(),
    new SolanaGetTrendingTokensAction(),
    new SolanaGetTokenDataAction(),
    new SolanaDepositAction(),
    new SolanaAllBalancesAction(),
    new EVMLiquidStakingYieldsAction(),
    new SolanaGetTokenAddressAction(),
    new SolanaTopHoldersAction(),
    new SolanaTokenHoldersAction(),
  ];
}

export const SOLANA_ACTIONS = getAllSolanaActions();

export * from "./evm-action";
export * from "./types";

export * from "./market";
export * from "./raydium";
export * from "./staking";
export * from "./token";
export * from "./trade";
export * from "./wallet";
