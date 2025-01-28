import { z } from "zod";

import { TopYieldToken } from "@/services/kamino";
import type { SolanaActionResult } from "../../solana-action";
import { GetTopYieldTokensInputSchema } from "./input-schema";

export type GetTopYieldTokensSchemaType = typeof GetTopYieldTokensInputSchema;

export type GetTopYieldTokensArgumentsType =
  z.infer<GetTopYieldTokensSchemaType>;

export type GetTopYieldTokensResultBodyType = {
  tokens: TopYieldToken[];
};

export type GetTopYieldTokensResultType =
  SolanaActionResult<GetTopYieldTokensResultBodyType>;
