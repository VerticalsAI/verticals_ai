import { z } from "zod";
import { SeiActionResult } from "../sei-action";
import { TradeInputSchema } from "./input-schema";

export type SeiTradeSchemaType = typeof TradeInputSchema;

export type SeiTradeArgumentsType = z.infer<SeiTradeSchemaType>;

export type SeiTradeResultBodyType = {
  transaction: string;
  inputAmount: number;
  inputToken: string;
  outputToken: string;
};

export type SolanaTradeResultType = SeiActionResult<SeiTradeResultBodyType>;
