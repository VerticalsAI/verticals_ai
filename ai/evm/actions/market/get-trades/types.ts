import { z } from "zod";

import { Token } from "@/db/types";
import type { EVMActionResult } from "../../evm-action";
import type { GetTraderTradesInputSchema } from "./input-schema";

export type TokenTraded = {
  token: Token;
  volume: {
    buy: number;
    sell: number;
  };
  balanceChange: number;
  usdChange: number;
};

export type GetTraderTradesSchemaType = typeof GetTraderTradesInputSchema;

export type GetTraderTradesArgumentsType = z.infer<GetTraderTradesSchemaType>;

export type GetTraderTradesResultBodyType = {
  tokensTraded: Record<string, TokenTraded>;
};

export type GetTraderTradesResultType =
  EVMActionResult<GetTraderTradesResultBodyType>;
