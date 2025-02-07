import { GetWalletAddressInputSchema } from "./input-schema";
import { SEI_GET_WALLET_ADDRESS_NAME } from "./name";
import { SEI_GET_WALLET_ADDRESS_PROMPT } from "./prompt";

import type { SeiAction } from "../../sei-action";
import type { GetWalletAddressResultBodyType } from "./types";

export class SeiGetWalletAddressAction
  implements
    SeiAction<
      typeof GetWalletAddressInputSchema,
      GetWalletAddressResultBodyType
    >
{
  public name = SEI_GET_WALLET_ADDRESS_NAME;
  public description = SEI_GET_WALLET_ADDRESS_PROMPT;
  public argsSchema = GetWalletAddressInputSchema;
}
