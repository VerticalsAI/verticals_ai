import { z } from "zod";

import { EthereumActionResult } from "../../ethereum-action";
import { TopTokenTradersInputSchema } from "./input-schema";

import { TopTraderByToken } from "@/services/birdeye";

export type TopTokenTradersSchemaType = typeof TopTokenTradersInputSchema;

export type TopTokenTradersArgumentsType = z.infer<TopTokenTradersSchemaType>;

export type TopTokenTradersResultBodyType = {
  topTraders: TopTraderByToken[];
};

export type TopTokenTradersResultType =
  EthereumActionResult<TopTokenTradersResultBodyType>;
