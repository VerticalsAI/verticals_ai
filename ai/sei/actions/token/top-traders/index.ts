import { TopTokenTradersInputSchema } from "./input-schema";
import { SOLANA_TOKEN_TOP_TRADERS_NAME } from "./name";
import { SOLANA_TOKEN_TOP_TRADERS_PROMPT } from "./prompt";
import { TopTokenTradersResultBodyType } from "./types";

import { getTopTokenTraders } from "./function";

import type { SeiAction } from "../../sei-action";

export class SolanaTopTokenTradersAction
  implements
    SeiAction<typeof TopTokenTradersInputSchema, TopTokenTradersResultBodyType>
{
  public name = SOLANA_TOKEN_TOP_TRADERS_NAME;
  public description = SOLANA_TOKEN_TOP_TRADERS_PROMPT;
  public argsSchema = TopTokenTradersInputSchema;
  public func = getTopTokenTraders;
}
