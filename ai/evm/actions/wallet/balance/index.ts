import { getBalance } from "./function";
import { BalanceInputSchema } from "./input-schema";
import { SOLANA_BALANCE_NAME } from "./name";
import { SOLANA_BALANCE_PROMPT } from "./prompt";
import { BalanceResultBodyType } from "./types";

import type { EVMAction } from "../../evm-action";

export class SolanaBalanceAction
  implements EVMAction<typeof BalanceInputSchema, BalanceResultBodyType>
{
  public name = SOLANA_BALANCE_NAME;
  public description = SOLANA_BALANCE_PROMPT;
  public argsSchema = BalanceInputSchema;
  public func = getBalance;
}
