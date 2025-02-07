import { WithdrawLiquidityInputSchema } from "./input-schema";
import { SOLANA_WITHDRAW_LIQUIDITY_NAME } from "./name";
import { SOLANA_WITHDRAW_LIQUIDITY_PROMPT } from "./prompt";

import type { EthereumAction } from "../../ethereum-action";
import type {
  SolanaWithdrawLiquidityResultBodyType,
  SolanaWithdrawLiquiditySchemaType,
} from "./types";

export class SolanaWithdrawLiquidityAction
  implements
    EthereumAction<
      SolanaWithdrawLiquiditySchemaType,
      SolanaWithdrawLiquidityResultBodyType
    >
{
  public name = SOLANA_WITHDRAW_LIQUIDITY_NAME;
  public description = SOLANA_WITHDRAW_LIQUIDITY_PROMPT;
  public argsSchema = WithdrawLiquidityInputSchema;
}
