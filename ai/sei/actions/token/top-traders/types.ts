import { z } from "zod";

import { SeiActionResult } from "../../sei-action";
import { TopTokenTradersInputSchema } from "./input-schema";

import { TopTraderByToken } from "@/services/birdeye";

export type TopTokenTradersSchemaType = typeof TopTokenTradersInputSchema;

export type TopTokenTradersArgumentsType = z.infer<TopTokenTradersSchemaType>;

export type TopTokenTradersResultBodyType = {
  topTraders: TopTraderByToken[];
};

export type TopTokenTradersResultType =
  SeiActionResult<TopTokenTradersResultBodyType>;
