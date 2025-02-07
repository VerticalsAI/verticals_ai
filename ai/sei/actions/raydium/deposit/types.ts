import { z } from "zod";
import { SeiActionResult } from "../../sei-action";
import { DepositLiquidityInputSchema } from "./input-schema";

export type SolanaDepositLiquiditySchemaType =
  typeof DepositLiquidityInputSchema;

export type SolanaDepositLiquidityArgumentsType =
  z.infer<SolanaDepositLiquiditySchemaType>;

export type SolanaDepositLiquidityResultBodyType = {
  transaction: string;
};

export type SolanaDepositLiquidityResultType =
  SeiActionResult<SolanaDepositLiquidityResultBodyType>;
