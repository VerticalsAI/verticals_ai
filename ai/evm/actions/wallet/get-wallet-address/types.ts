import { z } from "zod";

import type { EVMActionResult } from "../../evm-action";
import type { GetWalletAddressInputSchema } from "./input-schema";

export type GetWalletAddressSchemaType = typeof GetWalletAddressInputSchema;

export type GetWalletAddressArgumentsType = z.infer<GetWalletAddressSchemaType>;

export type GetWalletAddressResultBodyType = {
  address: string;
};

export type GetWalletAddressResultType =
  EVMActionResult<GetWalletAddressResultBodyType>;
