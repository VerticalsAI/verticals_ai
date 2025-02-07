import { DepositInputSchema } from "./input-schema";
import { SEI_DEPOSIT_NAME } from "./name";
import { SEI_DEPOSIT_PROMPT } from "./prompt";

import type { SeiAction } from "../../sei-action";
import type { DepositResultBodyType } from "./types";

export class SeiDepositAction
  implements SeiAction<typeof DepositInputSchema, DepositResultBodyType>
{
  public name = SEI_DEPOSIT_NAME;
  public description = SEI_DEPOSIT_PROMPT;
  public argsSchema = DepositInputSchema;
}
