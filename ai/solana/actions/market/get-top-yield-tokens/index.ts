import { getTopYieldTokens } from "./function";
import { GetTopYieldTokensInputSchema } from "./input-schema";
import { SOLANA_GET_TOP_YIELD_TOKENS_NAME } from "./name";
import { SOLANA_GET_TOP_YIELD_TOKENS_PROMPT } from "./prompt";

import type { SolanaAction } from "../../solana-action";
import type { GetTopYieldTokensResultBodyType } from "./types";

export class SolanaGetTopYieldTokensAction
  implements
    SolanaAction<
      typeof GetTopYieldTokensInputSchema,
      GetTopYieldTokensResultBodyType
    >
{
  public name = SOLANA_GET_TOP_YIELD_TOKENS_NAME;
  public description = SOLANA_GET_TOP_YIELD_TOKENS_PROMPT;
  public argsSchema = GetTopYieldTokensInputSchema;
  public func = getTopYieldTokens;
}
