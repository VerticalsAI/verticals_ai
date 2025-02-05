import { z } from "zod";

import { TopTokenTradersInputSchema } from "./input-schema";
import { SolanaActionResult } from "../../solana-action";

import { TopTraderByToken } from "@/services/birdeye";

export type TopTokenTradersSchemaType = typeof TopTokenTradersInputSchema;

export type TopTokenTradersArgumentsType = z.infer<TopTokenTradersSchemaType>;

export type TopTokenTradersResultBodyType = {
    topTraders: TopTraderByToken[];
}; 

export type TopTokenTradersResultType = SolanaActionResult<TopTokenTradersResultBodyType>;