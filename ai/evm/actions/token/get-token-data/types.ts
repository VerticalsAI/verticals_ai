import { z } from "zod";

import { GetTokenDataInputSchema } from "./input-schema";

import type { TokenOverview } from "@/services/birdeye/types";
import type { EVMActionResult } from "../../evm-action";

export type GetTokenDataSchemaType = typeof GetTokenDataInputSchema;

export type GetTokenDataArgumentsType = z.infer<GetTokenDataSchemaType>;

export type GetTokenDataResultBodyType = {
  token: TokenOverview;
};

export type GetTokenDataResultType =
  EVMActionResult<GetTokenDataResultBodyType>;
