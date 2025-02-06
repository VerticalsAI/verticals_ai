import { getAllBalances } from "./function";
import { AllBalancesInputSchema } from "./input-schema";
import { SOLANA_ALL_BALANCES_NAME } from "./name";
import { SOLANA_ALL_BALANCES_PROMPT } from "./prompt";

import type { EVMAction } from "../../evm-action";
import type { AllBalancesResultBodyType } from "./types";

export class SolanaAllBalancesAction
  implements
    EVMAction<typeof AllBalancesInputSchema, AllBalancesResultBodyType>
{
  public name = SOLANA_ALL_BALANCES_NAME;
  public description = SOLANA_ALL_BALANCES_PROMPT;
  public argsSchema = AllBalancesInputSchema;
  public func = getAllBalances;
}
