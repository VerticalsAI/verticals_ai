import { z } from "zod";

import type { EthereumActionResult } from "../../ethereum-action";
import { AllBalancesInputSchema } from "./input-schema";

export type EthereumAllBalancesSchemaType = typeof AllBalancesInputSchema;

export type EthereumAllBalancesArgumentsType =
  z.infer<EthereumAllBalancesSchemaType>;

export type EthereumAllBalancesResultBodyType = {
  balances: {
    balance: number;
    token: string;
    name: string;
    logoURI: string;
  }[];
};

export type EthereumAllBalancesResultType =
  EthereumActionResult<EthereumAllBalancesResultBodyType>;
