import { getBalance } from "./function";
import { BalanceInputSchema } from "./input-schema";
import { EVM_BALANCE_NAME } from "./name";
import { EVM_BALANCE_PROMPT } from "./prompt";
import { BalanceResultBodyType } from "./types";

import type { EVMAction } from "../../evm-action";

export class EVMBalanceAction
  implements EVMAction<typeof BalanceInputSchema, BalanceResultBodyType>
{
  public name = EVM_BALANCE_NAME;
  public description = EVM_BALANCE_PROMPT;
  public argsSchema = BalanceInputSchema;
  public func = getBalance;
}
