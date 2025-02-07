import { getTokenData } from "./function";
import { GetTokenDataInputSchema } from "./input-schema";
import { SOLANA_GET_TOKEN_DATA_NAME } from "./name";
import { SOLANA_GET_TOKEN_DATA_PROMPT } from "./prompt";

import type { SeiAction } from "../../sei-action";
import type { GetTokenDataResultBodyType } from "./types";

export class SolanaGetTokenDataAction
  implements
    SeiAction<typeof GetTokenDataInputSchema, GetTokenDataResultBodyType>
{
  public name = SOLANA_GET_TOKEN_DATA_NAME;
  public description = SOLANA_GET_TOKEN_DATA_PROMPT;
  public argsSchema = GetTokenDataInputSchema;
  public func = getTokenData;
}
