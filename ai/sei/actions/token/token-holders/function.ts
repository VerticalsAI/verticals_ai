import { getTokenAccountsByMint } from "@/services/helius";
import type { SeiActionResult } from "../../sei-action";
import type {
  TokenHoldersArgumentsType,
  TokenHoldersResultBodyType,
} from "./types";

export async function getNumHolders(
  args: TokenHoldersArgumentsType
): Promise<SeiActionResult<TokenHoldersResultBodyType>> {
  try {
    let tokenAccounts = await getTokenAccountsByMint(args.tokenAddress);

    if (args.threshold && args.threshold > 0) {
      tokenAccounts = tokenAccounts.filter(
        account => account.amount >= args.threshold!
      );
    }

    return {
      message: `The number of holders have been retrieved and displayed to the user. Now ask them what they want to do next.`,
      body: {
        numHolders: tokenAccounts.length,
      },
    };
  } catch (error) {
    return {
      message: `Error getting top holders: ${error}`,
    };
  }
}
