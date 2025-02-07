import { BubbleMapsArgumentsSchema } from "./input-schema";
import { SOLANA_BUBBLE_MAPS_NAME } from "./name";
import { SOLANA_BUBBLE_MAPS_PROMPT } from "./prompt";

import type { EVMAction } from "../../evm-action";
import type { BubbleMapsResultBodyType } from "./types";

export class SolanaGetBubbleMapsAction
  implements
    EVMAction<typeof BubbleMapsArgumentsSchema, BubbleMapsResultBodyType>
{
  public name = SOLANA_BUBBLE_MAPS_NAME;
  public description = SOLANA_BUBBLE_MAPS_PROMPT;
  public argsSchema = BubbleMapsArgumentsSchema;
}
