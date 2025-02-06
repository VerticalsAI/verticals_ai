import { getTopHolders } from "./function";
import { TopHoldersInputSchema } from "./input-schema";
import { SOLANA_TOP_HOLDERS_NAME } from "./name";
import { SOLANA_TOP_HOLDERS_PROMPT } from "./prompt";
import { TopHoldersResultBodyType } from "./types";

import type { EVMAction } from "../../evm-action";

export class SolanaTopHoldersAction
  implements EVMAction<typeof TopHoldersInputSchema, TopHoldersResultBodyType>
{
  public name = SOLANA_TOP_HOLDERS_NAME;
  public description = SOLANA_TOP_HOLDERS_PROMPT;
  public argsSchema = TopHoldersInputSchema;
  public func = getTopHolders;
}
