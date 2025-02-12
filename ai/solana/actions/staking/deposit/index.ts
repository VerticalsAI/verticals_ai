import { DepositInputSchema } from "./input-schema";
import { SOLANA_DEPOSIT_NAME } from "./name";
import { SOLANA_DEPOSIT_PROMPT } from "./prompt";

import type { SolanaAction } from "../../solana-action";
import type { DepositResultBodyType } from "./types";

export class SolanaDepositAction
  implements SolanaAction<typeof DepositInputSchema, DepositResultBodyType>
{
  public name = SOLANA_DEPOSIT_NAME;
  public description = SOLANA_DEPOSIT_PROMPT;
  public argsSchema = DepositInputSchema;
}
