import { z } from "zod";

import type { TrendingToken } from "@/services/birdeye";
import type { EthereumActionResult } from "../../ethereum-action";
import type { GetTrendingTokensInputSchema } from "./input-schema";

export type GetTrendingTokensSchemaType = typeof GetTrendingTokensInputSchema;

export type GetTrendingTokensArgumentsType =
  z.infer<GetTrendingTokensSchemaType>;

export type GetTrendingTokensResultBodyType = {
  tokens: TrendingToken[];
};

export type GetTrendingTokensResultType =
  EthereumActionResult<GetTrendingTokensResultBodyType>;
