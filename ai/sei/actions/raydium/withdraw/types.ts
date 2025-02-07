import { z } from "zod";
import { SeiActionResult } from "../../sei-action";
import { WithdrawLiquidityInputSchema } from "./input-schema";

export type SolanaWithdrawLiquiditySchemaType =
  typeof WithdrawLiquidityInputSchema;

export type SolanaWithdrawLiquidityArgumentsType =
  z.infer<SolanaWithdrawLiquiditySchemaType>;

export type SolanaWithdrawLiquidityResultBodyType = {
  transaction: string;
};

export type SolanaWithdrawLiquidityResultType =
  SeiActionResult<SolanaWithdrawLiquidityResultBodyType>;
