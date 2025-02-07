import { z } from "zod";

import { EVMActionResult } from "../../evm-action";
import { TokenPriceChartInputSchema } from "./input-schema";

export type TokenPriceChartSchemaType = typeof TokenPriceChartInputSchema;

export type TokenPriceChartArgumentsType = z.infer<TokenPriceChartSchemaType>;

export type TokenPriceChartResultBodyType = {};

export type TokenPriceChartResultType =
  EVMActionResult<TokenPriceChartResultBodyType>;
