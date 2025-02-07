import { BubbleMapsArgumentsSchema } from "./input-schema";
import { SEI_BUBBLE_MAPS_NAME } from "./name";
import { SEI_BUBBLE_MAPS_PROMPT } from "./prompt";

import type { SeiAction } from "../../sei-action";
import type { BubbleMapsResultBodyType } from "./types";

export class SeiGetBubbleMapsAction
  implements
    SeiAction<typeof BubbleMapsArgumentsSchema, BubbleMapsResultBodyType>
{
  public name = SEI_BUBBLE_MAPS_NAME;
  public description = SEI_BUBBLE_MAPS_PROMPT;
  public argsSchema = BubbleMapsArgumentsSchema;
}
