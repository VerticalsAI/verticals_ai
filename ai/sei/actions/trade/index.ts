import { SeiAction } from "../sei-action";
import { TradeInputSchema } from "./input-schema";
import { SEI_TRADE_NAME } from "./name";
import { SEI_TRADE_PROMPT } from "./prompt";

import type { SeiTradeResultBodyType, SeiTradeSchemaType } from "./types";

export class SeiTradeAction
  implements SeiAction<SeiTradeSchemaType, SeiTradeResultBodyType>
{
  public name = SEI_TRADE_NAME;
  public description = SEI_TRADE_PROMPT;
  public argsSchema = TradeInputSchema;
}
