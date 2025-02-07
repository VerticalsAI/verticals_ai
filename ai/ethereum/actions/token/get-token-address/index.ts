import { getTokenAddress } from "./function";
import { GetTokenAddressArgumentsSchema } from "./input-schema";
import { ETHEREUM_GET_TOKEN_ADDRESS_NAME } from "./name";
import { ETHEREUM_GET_TOKEN_ADDRESS_PROMPT } from "./prompt";

import type { EthereumAction } from "../../ethereum-action";
import type { GetTokenAddressResultBodyType } from "./types";

export class EthereumGetTokenAddressAction
  implements
    EthereumAction<
      typeof GetTokenAddressArgumentsSchema,
      GetTokenAddressResultBodyType
    >
{
  public name = ETHEREUM_GET_TOKEN_ADDRESS_NAME;
  public description = ETHEREUM_GET_TOKEN_ADDRESS_PROMPT;
  public argsSchema = GetTokenAddressArgumentsSchema;
  public func = getTokenAddress;
}
