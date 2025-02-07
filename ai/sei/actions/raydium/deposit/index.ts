import { DepositLiquidityInputSchema } from "./input-schema";
import { SOLANA_DEPOSIT_LIQUIDITY_NAME } from "./name";
import { SOLANA_DEPOSIT_LIQUIDITY_PROMPT } from "./prompt";

import type { EVMAction } from "../../sei-action";
import type {
  SolanaDepositLiquidityResultBodyType,
  SolanaDepositLiquiditySchemaType,
} from "./types";

export class SolanaDepositLiquidityAction
  implements
    EVMAction<
      SolanaDepositLiquiditySchemaType,
      SolanaDepositLiquidityResultBodyType
    >
{
  public name = SOLANA_DEPOSIT_LIQUIDITY_NAME;
  public description = SOLANA_DEPOSIT_LIQUIDITY_PROMPT;
  public argsSchema = DepositLiquidityInputSchema;
}
