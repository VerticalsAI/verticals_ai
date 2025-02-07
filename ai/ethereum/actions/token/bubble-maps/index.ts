import { BubbleMapsArgumentsSchema } from "./input-schema";
import { SOLANA_BUBBLE_MAPS_NAME } from "./name";
import { SOLANA_BUBBLE_MAPS_PROMPT } from "./prompt";

import type { EthereumAction } from "../../ethereum-action";
import type { BubbleMapsResultBodyType } from "./types";

export class SolanaGetBubbleMapsAction
  implements
    EthereumAction<typeof BubbleMapsArgumentsSchema, BubbleMapsResultBodyType>
{
  public name = SOLANA_BUBBLE_MAPS_NAME;
  public description = SOLANA_BUBBLE_MAPS_PROMPT;
  public argsSchema = BubbleMapsArgumentsSchema;
}
