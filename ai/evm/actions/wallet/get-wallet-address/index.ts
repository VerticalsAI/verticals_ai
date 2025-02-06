import { GetWalletAddressInputSchema } from "./input-schema";
import { SOLANA_GET_WALLET_ADDRESS_NAME } from "./name";
import { SOLANA_GET_WALLET_ADDRESS_PROMPT } from "./prompt";

import type { EVMAction } from "../../evm-action";
import type { GetWalletAddressResultBodyType } from "./types";

export class SolanaGetWalletAddressAction
  implements
    EVMAction<
      typeof GetWalletAddressInputSchema,
      GetWalletAddressResultBodyType
    >
{
  public name = SOLANA_GET_WALLET_ADDRESS_NAME;
  public description = SOLANA_GET_WALLET_ADDRESS_PROMPT;
  public argsSchema = GetWalletAddressInputSchema;
}
