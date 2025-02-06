import { SolanaGetTrendingTokensAction } from "./market";
import { EVMLiquidStakingYieldsAction, SolanaDepositAction } from "./staking";
import {
  EVMGetTokenAddressAction,
  SolanaGetTokenDataAction,
  SolanaTokenHoldersAction,
  SolanaTopHoldersAction,
} from "./token";
import { SolanaTradeAction } from "./trade";
import {
  EVMAllBalancesAction,
  EVMBalanceAction,
  EVMGetWalletAddressAction,
  EVMTransferAction,
} from "./wallet";

import type { EVMAction, EVMActionSchemaAny } from "./evm-action";

export function getAllEVMActions(): EVMAction<EVMActionSchemaAny, any>[] {
  return [
    new EVMBalanceAction(),
    new EVMTransferAction(),
    new SolanaTradeAction(),
    new EVMGetWalletAddressAction(),
    new SolanaGetTrendingTokensAction(),
    new SolanaGetTokenDataAction(),
    new SolanaDepositAction(),
    new EVMAllBalancesAction(),
    new EVMLiquidStakingYieldsAction(),
    new EVMGetTokenAddressAction(),
    new SolanaTopHoldersAction(),
    new SolanaTokenHoldersAction(),
  ];
}

export const SOLANA_ACTIONS = getAllEVMActions();

export * from "./evm-action";
export * from "./types";

export * from "./market";
export * from "./raydium";
export * from "./staking";
export * from "./token";
export * from "./trade";
export * from "./wallet";
