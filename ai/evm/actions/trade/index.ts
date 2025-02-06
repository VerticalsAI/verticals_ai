import { TradeInputSchema } from "./input-schema";
import { SOLANA_TRADE_NAME } from "./name";
import { SOLANA_TRADE_PROMPT } from "./prompt";

import type { EVMAction } from "../evm-action";
import type { SolanaTradeResultBodyType, SolanaTradeSchemaType } from "./types";

export class SolanaTradeAction
  implements EVMAction<SolanaTradeSchemaType, SolanaTradeResultBodyType>
{
  public name = SOLANA_TRADE_NAME;
  public description = SOLANA_TRADE_PROMPT;
  public argsSchema = TradeInputSchema;
}
