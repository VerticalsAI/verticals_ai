import { BubbleMapsArgumentsSchema } from "./input-schema";
import { SOLANA_BUBBLE_MAPS_NAME } from "./name";
import { SOLANA_BUBBLE_MAPS_PROMPT } from "./prompt";

import type { SeiAction } from "../../sei-action";
import type { BubbleMapsResultBodyType } from "./types";

export class SolanaGetBubbleMapsAction
  implements
    SeiAction<typeof BubbleMapsArgumentsSchema, BubbleMapsResultBodyType>
{
  public name = SOLANA_BUBBLE_MAPS_NAME;
  public description = SOLANA_BUBBLE_MAPS_PROMPT;
  public argsSchema = BubbleMapsArgumentsSchema;
}
