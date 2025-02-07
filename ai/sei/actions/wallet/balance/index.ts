import { getBalance } from "./function";
import { BalanceInputSchema } from "./input-schema";
import { SEI_BALANCE_NAME } from "./name";
import { SEI_BALANCE_PROMPT } from "./prompt";
import { BalanceResultBodyType } from "./types";

import type { SeiAction } from "../../sei-action";

export class SeiBalanceAction
  implements SeiAction<typeof BalanceInputSchema, BalanceResultBodyType>
{
  public name = SEI_BALANCE_NAME;
  public description = SEI_BALANCE_PROMPT;
  public argsSchema = BalanceInputSchema;
  public func = getBalance;
}
