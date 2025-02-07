import { z } from "zod";
import { EthereumActionResult } from "../../ethereum-action";
import { WithdrawLiquidityInputSchema } from "./input-schema";

export type SolanaWithdrawLiquiditySchemaType =
  typeof WithdrawLiquidityInputSchema;

export type SolanaWithdrawLiquidityArgumentsType =
  z.infer<SolanaWithdrawLiquiditySchemaType>;

export type SolanaWithdrawLiquidityResultBodyType = {
  transaction: string;
};

export type SolanaWithdrawLiquidityResultType =
  EthereumActionResult<SolanaWithdrawLiquidityResultBodyType>;
