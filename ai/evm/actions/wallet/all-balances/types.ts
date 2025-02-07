import { z } from "zod";

import type { EVMActionResult } from "../../evm-action";
import { AllBalancesInputSchema } from "./input-schema";

export type AllBalancesEVMSchemaType = typeof AllBalancesInputSchema;

export type AllBalancesEVMArgumentsType = z.infer<AllBalancesEVMSchemaType>;

export type AllBalancesEVMResultBodyType = {
  balances: {
    balance: number;
    token: string;
    name: string;
    logoURI: string;
  }[];
};

export type AllBalancesEVMResultType =
  EVMActionResult<AllBalancesEVMResultBodyType>;
