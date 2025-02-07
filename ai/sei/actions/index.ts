import { SeiLiquidStakingYieldsAction } from "./staking";
import { SeiGetTokenAddressAction } from "./token";
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
    new SeiGetWalletAddressAction(),
    new SeiAllBalancesAction(),
    new SeiLiquidStakingYieldsAction(),
    new SeiGetTokenAddressAction(),
  ];
}

export const SOLANA_ACTIONS = getAllSeiActions();

export * from "./sei-action";
export * from "./types";

export * from "./staking";
export * from "./token";
export * from "./wallet";
