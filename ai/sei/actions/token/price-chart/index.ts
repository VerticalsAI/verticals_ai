import { getPriceChart } from "./function";
import { TokenPriceChartInputSchema } from "./input-schema";
import { SOLANA_TOKEN_PRICE_CHART_NAME } from "./name";
import { SOLANA_TOKEN_PRICE_CHART_PROMPT } from "./prompt";
import { TokenPriceChartResultBodyType } from "./types";

import type { EVMAction } from "../../sei-action";

export class SolanaTokenPriceChartAction
  implements
    EVMAction<typeof TokenPriceChartInputSchema, TokenPriceChartResultBodyType>
{
  public name = SOLANA_TOKEN_PRICE_CHART_NAME;
  public description = SOLANA_TOKEN_PRICE_CHART_PROMPT;
  public argsSchema = TokenPriceChartInputSchema;
  public func = getPriceChart;
}
