import { z } from "zod";

import type { EthereumActionResult } from "../../ethereum-action";
import type { GetWalletAddressInputSchema } from "./input-schema";

export type GetWalletAddressSchemaType = typeof GetWalletAddressInputSchema;

export type GetWalletAddressArgumentsType = z.infer<GetWalletAddressSchemaType>;

export type GetWalletAddressResultBodyType = {
  address: string;
};

export type GetWalletAddressResultType =
  EthereumActionResult<GetWalletAddressResultBodyType>;
