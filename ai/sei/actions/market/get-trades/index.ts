import { getTraderTrades } from "./function";
import { GetTraderTradesInputSchema } from "./input-schema";
import { SOLANA_GET_TRADER_TRADES_NAME } from "./name";
import { SOLANA_GET_TRADER_TRADES_PROMPT } from "./prompt";

import type { SeiAction } from "../../sei-action";
import type { GetTraderTradesResultBodyType } from "./types";

export class SolanaGetTraderTradesAction
  implements
    SeiAction<typeof GetTraderTradesInputSchema, GetTraderTradesResultBodyType>
{
  public name = SOLANA_GET_TRADER_TRADES_NAME;
  public description = SOLANA_GET_TRADER_TRADES_PROMPT;
  public argsSchema = GetTraderTradesInputSchema;
  public func = getTraderTrades;
}
