import { z } from "zod";

import { SeiActionResult } from "../../sei-action";
import { TokenHoldersInputSchema } from "./input-schema";

export type TokenHoldersSchemaType = typeof TokenHoldersInputSchema;

export type TokenHoldersArgumentsType = z.infer<TokenHoldersSchemaType>;

export type TokenHoldersResultBodyType = {
  numHolders: number;
};

export type TokenHoldersResultType =
  SeiActionResult<TokenHoldersResultBodyType>;
