import { z } from "zod";

import type { EVMActionResult } from "../../evm-action";
import { AllBalancesInputSchema } from "./input-schema";

export type AllBalancesSchemaType = typeof AllBalancesInputSchema;

export type AllBalancesArgumentsType = z.infer<AllBalancesSchemaType>;

export type AllBalancesResultBodyType = {
  balances: {
    balance: number;
    token: string;
    name: string;
    logoURI: string;
  }[];
};

export type AllBalancesResultType = EVMActionResult<AllBalancesResultBodyType>;
