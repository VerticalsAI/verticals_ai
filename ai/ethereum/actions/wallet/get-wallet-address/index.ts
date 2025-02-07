import { GetWalletAddressInputSchema } from "./input-schema";
import { ETHEREUM_GET_WALLET_ADDRESS_NAME } from "./name";
import { ETHEREUM_GET_WALLET_ADDRESS_PROMPT } from "./prompt";

import type { EthereumAction } from "../../ethereum-action";
import type { GetWalletAddressResultBodyType } from "./types";

export class EthereumGetWalletAddressAction
  implements
    EthereumAction<
      typeof GetWalletAddressInputSchema,
      GetWalletAddressResultBodyType
    >
{
  public name = ETHEREUM_GET_WALLET_ADDRESS_NAME;
  public description = ETHEREUM_GET_WALLET_ADDRESS_PROMPT;
  public argsSchema = GetWalletAddressInputSchema;
}
