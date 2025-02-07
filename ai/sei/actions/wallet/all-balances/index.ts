import { getAllBalances } from "./function";
import { AllBalancesInputSchema } from "./input-schema";
import { EVM_ALL_BALANCES_NAME } from "./name";
import { EVM_ALL_BALANCES_PROMPT } from "./prompt";

import type { EVMAction } from "../../sei-action";
import type { AllBalancesEVMResultBodyType } from "./types";

export class EVMAllBalancesAction
  implements
    EVMAction<typeof AllBalancesInputSchema, AllBalancesEVMResultBodyType>
{
  public name = EVM_ALL_BALANCES_NAME;
  public description = EVM_ALL_BALANCES_PROMPT;
  public argsSchema = AllBalancesInputSchema;
  public func = getAllBalances;
}
