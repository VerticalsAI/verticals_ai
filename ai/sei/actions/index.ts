import { SeiLiquidStakingYieldsAction } from "./staking";
import { SeiGetTokenAddressAction } from "./token";
import {
  SeiAllBalancesAction,
  SeiBalanceAction,
  SeiGetWalletAddressAction,
} from "./wallet";

import type { SeiAction, SeiActionSchemaAny } from "./sei-action";
import { SeiTradeAction } from "./trade";

export function getAllSeiActions(): SeiAction<SeiActionSchemaAny, any>[] {
  return [
    new SeiBalanceAction(),
    // new SeiTransferAction(),
    new SeiGetWalletAddressAction(),
    new SeiAllBalancesAction(),
    new SeiLiquidStakingYieldsAction(),
    new SeiTradeAction(),
    new SeiGetTokenAddressAction(),
  ];
}

export const SEI_ACTIONS = getAllSeiActions();

export * from "./sei-action";
export * from "./types";

export * from "./staking";
export * from "./token";
export * from "./trade";
export * from "./wallet";
