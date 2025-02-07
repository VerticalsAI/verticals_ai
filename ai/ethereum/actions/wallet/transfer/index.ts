import { TransferInputSchema } from "./input-schema";
import { ETHEREUM_TRANSFER_NAME } from "./name";
import { SOLANA_TRANSFER_PROMPT } from "./prompt";

import type { EthereumAction } from "../../ethereum-action";
import type { SolanaTransferResultBodyType } from "./types";

export class EthereumTransferAction
  implements
    EthereumAction<typeof TransferInputSchema, SolanaTransferResultBodyType>
{
  public name = ETHEREUM_TRANSFER_NAME;
  public description = SOLANA_TRANSFER_PROMPT;
  public argsSchema = TransferInputSchema;
}
