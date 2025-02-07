import { SolanaGetTrendingTokensAction } from "./market";
import { SeiLiquidStakingYieldsAction, SolanaDepositAction } from "./staking";
import {
  SeiGetTokenAddressAction,
  SolanaGetTokenDataAction,
  SolanaTokenHoldersAction,
  SolanaTopHoldersAction,
} from "./token";
import { SolanaTradeAction } from "./trade";
import {
  SeiAllBalancesAction,
  SeiBalanceAction,
  SeiGetWalletAddressAction,
  SeiTransferAction,
} from "./wallet";

import type { SeiAction, SeiActionSchemaAny } from "./sei-action";

export function getAllSeiActions(): SeiAction<SeiActionSchemaAny, any>[] {
  return [
    new SeiBalanceAction(),
    new SeiTransferAction(),
    new SolanaTradeAction(),
    new SeiGetWalletAddressAction(),
    new SolanaGetTrendingTokensAction(),
    new SolanaGetTokenDataAction(),
    new SolanaDepositAction(),
    new SeiAllBalancesAction(),
    new SeiLiquidStakingYieldsAction(),
    new SeiGetTokenAddressAction(),
    new SolanaTopHoldersAction(),
    new SolanaTokenHoldersAction(),
  ];
}

export const SOLANA_ACTIONS = getAllSeiActions();

export * from "./sei-action";
export * from "./types";

export * from "./market";
export * from "./raydium";
export * from "./staking";
export * from "./token";
export * from "./trade";
export * from "./wallet";
