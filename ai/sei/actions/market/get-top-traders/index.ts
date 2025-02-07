import { getTopTraders } from "./function";
import { GetTopTradersInputSchema } from "./input-schema";
import { SOLANA_GET_TOP_TRADERS_NAME } from "./name";
import { SOLANA_GET_TOP_TRADERS_PROMPT } from "./prompt";

import type { SeiAction } from "../../sei-action";
import type { GetTopTradersResultBodyType } from "./types";

export class SolanaGetTopTradersAction
  implements
    SeiAction<typeof GetTopTradersInputSchema, GetTopTradersResultBodyType>
{
  public name = SOLANA_GET_TOP_TRADERS_NAME;
  public description = SOLANA_GET_TOP_TRADERS_PROMPT;
  public argsSchema = GetTopTradersInputSchema;
  public func = getTopTraders;
}
