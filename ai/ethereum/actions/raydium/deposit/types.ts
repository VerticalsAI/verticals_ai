import { z } from "zod";
import { EthereumActionResult } from "../../ethereum-action";
import { DepositLiquidityInputSchema } from "./input-schema";

export type SolanaDepositLiquiditySchemaType =
  typeof DepositLiquidityInputSchema;

export type SolanaDepositLiquidityArgumentsType =
  z.infer<SolanaDepositLiquiditySchemaType>;

export type SolanaDepositLiquidityResultBodyType = {
  transaction: string;
};

export type SolanaDepositLiquidityResultType =
  EthereumActionResult<SolanaDepositLiquidityResultBodyType>;
