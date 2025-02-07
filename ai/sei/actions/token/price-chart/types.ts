import { z } from "zod";

import { SeiActionResult } from "../../sei-action";
import { TokenPriceChartInputSchema } from "./input-schema";

export type TokenPriceChartSchemaType = typeof TokenPriceChartInputSchema;

export type TokenPriceChartArgumentsType = z.infer<TokenPriceChartSchemaType>;

export type TokenPriceChartResultBodyType = {};

export type TokenPriceChartResultType =
  SeiActionResult<TokenPriceChartResultBodyType>;
