import { SolanaGetTrendingTokensAction } from "./market";
import {
  SolanaDepositAction,
  SolanaLiquidStakingYieldsAction,
} from "./staking";
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

import type { SolanaAction, SolanaActionSchemaAny } from "./solana-action";

export function getAllSolanaActions(): SolanaAction<
  SolanaActionSchemaAny,
  any
>[] {
  return [
    new SolanaBalanceAction(),
    new SolanaTransferAction(),
    new SolanaTradeAction(),
    new SolanaGetWalletAddressAction(),
    new SolanaGetTrendingTokensAction(),
    new SolanaGetTokenDataAction(),
    new SolanaDepositAction(),
    new SolanaAllBalancesAction(),
    new SolanaLiquidStakingYieldsAction(),
    new SolanaGetTokenAddressAction(),
    new SolanaTopHoldersAction(),
    new SolanaTokenHoldersAction(),
  ];
}

export const SOLANA_ACTIONS = getAllSolanaActions();

export * from "./solana-action";
export * from "./types";

export * from "./market";
export * from "./raydium";
export * from "./staking";
export * from "./token";
export * from "./trade";
export * from "./wallet";
