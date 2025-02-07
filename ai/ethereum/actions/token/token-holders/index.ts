import { getNumHolders } from "./function";
import { TokenHoldersInputSchema } from "./input-schema";
import { SOLANA_TOKEN_HOLDERS_NAME } from "./name";
import { SOLANA_TOKEN_HOLDERS_PROMPT } from "./prompt";
import { TokenHoldersResultBodyType } from "./types";

import type { EthereumAction } from "../../ethereum-action";

export class SolanaTokenHoldersAction
  implements
    EthereumAction<typeof TokenHoldersInputSchema, TokenHoldersResultBodyType>
{
  public name = SOLANA_TOKEN_HOLDERS_NAME;
  public description = SOLANA_TOKEN_HOLDERS_PROMPT;
  public argsSchema = TokenHoldersInputSchema;
  public func = getNumHolders;
}
