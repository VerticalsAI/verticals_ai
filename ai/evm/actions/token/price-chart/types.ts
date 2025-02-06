import { z } from "zod";

import { TokenPriceChartInputSchema } from "./input-schema";
import { SolanaActionResult } from "../../solana-action";
import { OHLCVData } from "@/services/birdeye";

export type TokenPriceChartSchemaType = typeof TokenPriceChartInputSchema;

export type TokenPriceChartArgumentsType = z.infer<TokenPriceChartSchemaType>;

export type TokenPriceChartResultBodyType = {}; 

export type TokenPriceChartResultType = SolanaActionResult<TokenPriceChartResultBodyType>;
