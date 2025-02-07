import { z } from "zod";

import type { SeiActionResult } from "../../sei-action";
import { AllBalancesInputSchema } from "./input-schema";

export type SeiAllBalancesSchemaType = typeof AllBalancesInputSchema;

export type SeiAllBalancesArgumentsType = z.infer<SeiAllBalancesSchemaType>;

export type SeiAllBalancesResultBodyType = {
  balances: {
    balance: number;
    token: string;
    name: string;
    logoURI: string;
  }[];
};

export type SeiAllBalancesResultType =
  SeiActionResult<SeiAllBalancesResultBodyType>;
