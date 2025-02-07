import { getAllBalances } from "./function";
import { AllBalancesInputSchema } from "./input-schema";
import { SEI_ALL_BALANCES_NAME } from "./name";
import { SEI_ALL_BALANCES_PROMPT } from "./prompt";

import type { SeiAction } from "../../sei-action";
import type { SeiAllBalancesResultBodyType } from "./types";

export class SeiAllBalancesAction
  implements
    SeiAction<typeof AllBalancesInputSchema, SeiAllBalancesResultBodyType>
{
  public name = SEI_ALL_BALANCES_NAME;
  public description = SEI_ALL_BALANCES_PROMPT;
  public argsSchema = AllBalancesInputSchema;
  public func = getAllBalances;
}
