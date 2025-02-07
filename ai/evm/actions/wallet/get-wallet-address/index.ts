import { GetWalletAddressInputSchema } from "./input-schema";
import { EVM_GET_WALLET_ADDRESS_NAME } from "./name";
import { EVM_GET_WALLET_ADDRESS_PROMPT } from "./prompt";

import type { EVMAction } from "../../evm-action";
import type { GetWalletAddressResultBodyType } from "./types";

export class EVMGetWalletAddressAction
  implements
    EVMAction<
      typeof GetWalletAddressInputSchema,
      GetWalletAddressResultBodyType
    >
{
  public name = EVM_GET_WALLET_ADDRESS_NAME;
  public description = EVM_GET_WALLET_ADDRESS_PROMPT;
  public argsSchema = GetWalletAddressInputSchema;
}
