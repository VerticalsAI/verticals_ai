import { z } from "zod";

import type { TopTrader } from "@/services/birdeye";
import type { SeiActionResult } from "../../sei-action";
import type { GetTopTradersInputSchema } from "./input-schema";

export type GetTopTradersSchemaType = typeof GetTopTradersInputSchema;

export type GetTopTradersArgumentsType = z.infer<GetTopTradersSchemaType>;

export type GetTopTradersResultBodyType = {
  traders: TopTrader[];
};

export type GetTopTradersResultType =
  SeiActionResult<GetTopTradersResultBodyType>;
