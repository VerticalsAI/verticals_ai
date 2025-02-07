import { getTokenAddress } from "./function";
import { GetTokenAddressArgumentsSchema } from "./input-schema";
import { SOLANA_GET_TOKEN_ADDRESS_NAME } from "./name";
import { SOLANA_GET_TOKEN_ADDRESS_PROMPT } from "./prompt";

import type { SolanaAction } from "../../solana-action";
import type { GetTokenAddressResultBodyType } from "./types";

export class SolanaGetTokenAddressAction
  implements
    SolanaAction<
      typeof GetTokenAddressArgumentsSchema,
      GetTokenAddressResultBodyType
    >
{
  public name = SOLANA_GET_TOKEN_ADDRESS_NAME;
  public description = SOLANA_GET_TOKEN_ADDRESS_PROMPT;
  public argsSchema = GetTokenAddressArgumentsSchema;
  public func = getTokenAddress;
}
