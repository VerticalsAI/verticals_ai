import { SolanaGetTrendingTokensAction } from "./market";
import {
  EthereumLiquidStakingYieldsAction,
  SolanaDepositAction,
} from "./staking";
import {
  EthereumGetTokenAddressAction,
  SolanaGetTokenDataAction,
  SolanaTokenHoldersAction,
  SolanaTopHoldersAction,
} from "./token";
import { SolanaTradeAction } from "./trade";
import {
  EthereumAllBalancesAction,
  EthereumBalanceAction,
  EthereumGetWalletAddressAction,
  EthereumTransferAction,
} from "./wallet";

import type {
  EthereumAction,
  EthereumActionSchemaAny,
} from "./ethereum-action";

export function getAllEthereumActions(): EthereumAction<
  EthereumActionSchemaAny,
  any
>[] {
  return [
    new EthereumBalanceAction(),
    new EthereumTransferAction(),
    new SolanaTradeAction(),
    new EthereumGetWalletAddressAction(),
    new SolanaGetTrendingTokensAction(),
    new SolanaGetTokenDataAction(),
    new SolanaDepositAction(),
    new EthereumAllBalancesAction(),
    new EthereumLiquidStakingYieldsAction(),
    new EthereumGetTokenAddressAction(),
    new SolanaTopHoldersAction(),
    new SolanaTokenHoldersAction(),
  ];
}

export const SOLANA_ACTIONS = getAllEthereumActions();

export * from "./ethereum-action";
export * from "./types";

export * from "./market";
export * from "./raydium";
export * from "./staking";
export * from "./token";
export * from "./trade";
export * from "./wallet";
