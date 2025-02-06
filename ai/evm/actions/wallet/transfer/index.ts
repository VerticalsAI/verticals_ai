import { TransferInputSchema } from "./input-schema";
import { SOLANA_TRANSFER_NAME } from "./name";
import { SOLANA_TRANSFER_PROMPT } from "./prompt";

import type { EVMAction } from "../../evm-action";
import type { SolanaTransferResultBodyType } from "./types";

export class SolanaTransferAction
  implements
    EVMAction<typeof TransferInputSchema, SolanaTransferResultBodyType>
{
  public name = SOLANA_TRANSFER_NAME;
  public description = SOLANA_TRANSFER_PROMPT;
  public argsSchema = TransferInputSchema;
}
