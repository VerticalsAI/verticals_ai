import { getTokenAddress } from "./function";
import { GetTokenAddressArgumentsSchema } from "./input-schema";
import { SEI_GET_TOKEN_ADDRESS_NAME } from "./name";
import { SEI_GET_TOKEN_ADDRESS_PROMPT } from "./prompt";

import type { SeiAction } from "../../sei-action";
import type { GetTokenAddressResultBodyType } from "./types";

export class SeiGetTokenAddressAction
  implements
    SeiAction<
      typeof GetTokenAddressArgumentsSchema,
      GetTokenAddressResultBodyType
    >
{
  public name = SEI_GET_TOKEN_ADDRESS_NAME;
  public description = SEI_GET_TOKEN_ADDRESS_PROMPT;
  public argsSchema = GetTokenAddressArgumentsSchema;
  public func = getTokenAddress;
}
