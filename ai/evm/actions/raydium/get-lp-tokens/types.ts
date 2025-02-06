import { z } from "zod";

import { GetLpTokensInputSchema } from "./input-schema";

import type { LpToken } from "@/services/raydium/types";
import type { EVMActionResult } from "../../evm-action";

export type GetLpTokensSchemaType = typeof GetLpTokensInputSchema;

export type GetLpTokensArgumentsType = z.infer<GetLpTokensSchemaType>;

export type GetLpTokensResultBodyType = {
  lpTokens: LpToken[];
};

export type GetLpTokensResultType = EVMActionResult<GetLpTokensResultBodyType>;
