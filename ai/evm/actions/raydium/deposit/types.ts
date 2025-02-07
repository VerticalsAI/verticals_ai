import { z } from "zod";
import { EVMActionResult } from "../../evm-action";
import { DepositLiquidityInputSchema } from "./input-schema";

export type SolanaDepositLiquiditySchemaType =
  typeof DepositLiquidityInputSchema;

export type SolanaDepositLiquidityArgumentsType =
  z.infer<SolanaDepositLiquiditySchemaType>;

export type SolanaDepositLiquidityResultBodyType = {
  transaction: string;
};

export type SolanaDepositLiquidityResultType =
  EVMActionResult<SolanaDepositLiquidityResultBodyType>;
