import { z } from "zod";

import { SeiActionResult } from "../../sei-action";
import { BubbleMapsArgumentsSchema } from "./input-schema";

export type BubbleMapsSchemaType = typeof BubbleMapsArgumentsSchema;

export type BubbleMapsArgumentsType = z.infer<BubbleMapsSchemaType>;

export type BubbleMapsResultBodyType = {
  success: boolean;
};

export type BubbleMapsResultType = SeiActionResult<BubbleMapsResultBodyType>;
