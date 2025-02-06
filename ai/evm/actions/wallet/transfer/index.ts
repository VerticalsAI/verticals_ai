import { TransferInputSchema } from "./input-schema";
import { EVM_TRANSFER_NAME } from "./name";
import { SOLANA_TRANSFER_PROMPT } from "./prompt";

import type { EVMAction } from "../../evm-action";
import type { SolanaTransferResultBodyType } from "./types";

export class EVMTransferAction
  implements
    EVMAction<typeof TransferInputSchema, SolanaTransferResultBodyType>
{
  public name = EVM_TRANSFER_NAME;
  public description = SOLANA_TRANSFER_PROMPT;
  public argsSchema = TransferInputSchema;
}
