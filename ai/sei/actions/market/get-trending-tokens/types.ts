import { z } from "zod";

import type { TrendingToken } from "@/services/birdeye";
import type { EVMActionResult } from "../../sei-action";
import type { GetTrendingTokensInputSchema } from "./input-schema";

export type GetTrendingTokensSchemaType = typeof GetTrendingTokensInputSchema;

export type GetTrendingTokensArgumentsType =
  z.infer<GetTrendingTokensSchemaType>;

export type GetTrendingTokensResultBodyType = {
  tokens: TrendingToken[];
};

export type GetTrendingTokensResultType =
  EVMActionResult<GetTrendingTokensResultBodyType>;
