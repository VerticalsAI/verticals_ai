import { getBalance } from "./function";
import { BalanceInputSchema } from "./input-schema";
import { ETHEREUM_BALANCE_NAME } from "./name";
import { ETHEREUM_BALANCE_PROMPT } from "./prompt";
import { BalanceResultBodyType } from "./types";

import type { EthereumAction } from "../../ethereum-action";

export class EthereumBalanceAction
  implements EthereumAction<typeof BalanceInputSchema, BalanceResultBodyType>
{
  public name = ETHEREUM_BALANCE_NAME;
  public description = ETHEREUM_BALANCE_PROMPT;
  public argsSchema = BalanceInputSchema;
  public func = getBalance;
}
