import { z } from "zod";

import { EVMActionResult } from "../../sei-action";
import { BalanceInputSchema } from "./input-schema";

export type BalanceSchemaType = typeof BalanceInputSchema;

export type BalanceArgumentsType = z.infer<BalanceSchemaType>;

export type BalanceResultBodyType = {
  balance: number;
  token: string;
  name: string;
  logoURI: string;
};

export type BalanceResultType = EVMActionResult<BalanceResultBodyType>;
