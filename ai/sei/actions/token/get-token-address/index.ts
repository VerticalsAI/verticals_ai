import { getTokenAddress } from "./function";
import { GetTokenAddressArgumentsSchema } from "./input-schema";
import { EVM_GET_TOKEN_ADDRESS_NAME } from "./name";
import { EVM_GET_TOKEN_ADDRESS_PROMPT } from "./prompt";

import type { EVMAction } from "../../sei-action";
import type { GetTokenAddressResultBodyType } from "./types";

export class EVMGetTokenAddressAction
  implements
    EVMAction<
      typeof GetTokenAddressArgumentsSchema,
      GetTokenAddressResultBodyType
    >
{
  public name = EVM_GET_TOKEN_ADDRESS_NAME;
  public description = EVM_GET_TOKEN_ADDRESS_PROMPT;
  public argsSchema = GetTokenAddressArgumentsSchema;
  public func = getTokenAddress;
}
