import { getLpTokens } from "./function";
import { GetLpTokensInputSchema } from "./input-schema";
import { SOLANA_GET_LP_TOKENS_NAME } from "./name";
import { SOLANA_GET_LP_TOKENS_PROMPT } from "./prompt";

import type { EthereumAction } from "../../ethereum-action";
import type { GetLpTokensResultBodyType } from "./types";

export class SolanaGetLpTokensAction
  implements
    EthereumAction<typeof GetLpTokensInputSchema, GetLpTokensResultBodyType>
{
  public name = SOLANA_GET_LP_TOKENS_NAME;
  public description = SOLANA_GET_LP_TOKENS_PROMPT;
  public argsSchema = GetLpTokensInputSchema;
  public func = getLpTokens;
}
