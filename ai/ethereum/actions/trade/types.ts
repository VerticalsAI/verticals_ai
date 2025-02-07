import { z } from "zod";
import { EthereumActionResult } from "../ethereum-action";
import { TradeInputSchema } from "./input-schema";

export type SolanaTradeSchemaType = typeof TradeInputSchema;

export type SolanaTradeArgumentsType = z.infer<SolanaTradeSchemaType>;

export type SolanaTradeResultBodyType = {
  transaction: string;
  inputAmount: number;
  inputToken: string;
  outputToken: string;
};

export type SolanaTradeResultType =
  EthereumActionResult<SolanaTradeResultBodyType>;
