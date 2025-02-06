import { getTrendingTokens } from "./function";
import { GetTrendingTokensInputSchema } from "./input-schema";
import { SOLANA_GET_TRENDING_TOKENS_NAME } from "./name";
import { SOLANA_GET_TRENDING_TOKENS_PROMPT } from "./prompt";

import type { EVMAction } from "../../evm-action";
import type { GetTrendingTokensResultBodyType } from "./types";

export class SolanaGetTrendingTokensAction
  implements
    EVMAction<
      typeof GetTrendingTokensInputSchema,
      GetTrendingTokensResultBodyType
    >
{
  public name = SOLANA_GET_TRENDING_TOKENS_NAME;
  public description = SOLANA_GET_TRENDING_TOKENS_PROMPT;
  public argsSchema = GetTrendingTokensInputSchema;
  public func = getTrendingTokens;
}
