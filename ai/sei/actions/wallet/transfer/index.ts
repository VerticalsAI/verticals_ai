import { TransferInputSchema } from "./input-schema";
import { SEI_TRANSFER_NAME } from "./name";
import { SEI_TRANSFER_PROMPT } from "./prompt";

import type { SeiAction } from "../../sei-action";
import type { SolanaTransferResultBodyType } from "./types";

export class SeiTransferAction
  implements
    SeiAction<typeof TransferInputSchema, SolanaTransferResultBodyType>
{
  public name = SEI_TRANSFER_NAME;
  public description = SEI_TRANSFER_PROMPT;
  public argsSchema = TransferInputSchema;
}
