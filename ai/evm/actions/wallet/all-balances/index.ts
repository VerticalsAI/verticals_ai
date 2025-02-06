import { getAllBalances } from "./function";
import { AllBalancesInputSchema } from "./input-schema";
import { EVM_ALL_BALANCES_NAME } from "./name";
import { SOLANA_ALL_BALANCES_PROMPT } from "./prompt";

import type { EVMAction } from "../../evm-action";
import type { AllBalancesEVMResultBodyType } from "./types";

export class SolanaAllBalancesAction
  implements
    EVMAction<typeof AllBalancesInputSchema, AllBalancesEVMResultBodyType>
{
  public name = EVM_ALL_BALANCES_NAME;
  public description = SOLANA_ALL_BALANCES_PROMPT;
  public argsSchema = AllBalancesInputSchema;
  public func = getAllBalances;
}
