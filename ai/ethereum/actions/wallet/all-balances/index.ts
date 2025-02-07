import { getAllBalances } from "./function";
import { AllBalancesInputSchema } from "./input-schema";
import { ETHEREUM_ALL_BALANCES_NAME } from "./name";
import { ETHEREUM_ALL_BALANCES_PROMPT } from "./prompt";

import type { EthereumAction } from "../../ethereum-action";
import type { EthereumAllBalancesResultBodyType } from "./types";

export class EthereumAllBalancesAction
  implements
    EthereumAction<
      typeof AllBalancesInputSchema,
      EthereumAllBalancesResultBodyType
    >
{
  public name = ETHEREUM_ALL_BALANCES_NAME;
  public description = ETHEREUM_ALL_BALANCES_PROMPT;
  public argsSchema = AllBalancesInputSchema;
  public func = getAllBalances;
}
