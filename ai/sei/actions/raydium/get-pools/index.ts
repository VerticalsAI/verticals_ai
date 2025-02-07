import { getPools } from "./function";
import { GetPoolsInputSchema } from "./input-schema";
import { SOLANA_GET_POOLS_NAME } from "./name";
import { SOLANA_GET_POOLS_PROMPT } from "./prompt";

import type { EVMAction } from "../../sei-action";
import type { GetPoolsResultBodyType } from "./types";

export class SolanaGetPoolsAction
  implements EVMAction<typeof GetPoolsInputSchema, GetPoolsResultBodyType>
{
  public name = SOLANA_GET_POOLS_NAME;
  public description = SOLANA_GET_POOLS_PROMPT;
  public argsSchema = GetPoolsInputSchema;
  public func = getPools;
}
