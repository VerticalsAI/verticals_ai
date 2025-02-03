import { getTopYieldTokensKamino } from "@/services/kamino";
import type { SolanaActionResult } from "../../solana-action";
import type {
  GetTopYieldTokensArgumentsType,
  GetTopYieldTokensResultBodyType,
} from "./types";

import ListToken from "@/services/kamino/tokens.json";

/**
 * Gets the trending tokens from Birdeye API.
 *
 * @param solanaKit - The Solana agent kit instance
 * @param args - The input arguments for the action
 * @returns A message containing the trending tokens information
 */
export async function getTopYieldTokens(
  args: GetTopYieldTokensArgumentsType
): Promise<SolanaActionResult<GetTopYieldTokensResultBodyType>> {
  try {
    const response = await getTopYieldTokensKamino();
    const tokens = response.sort(
      (a, b) => parseFloat(b.apy) - parseFloat(a.apy)
    );

    const tokensData = await Promise.all(
      tokens.map(token => {
        const data = ListToken.find(t => t.address === token.tokenMint);
        return {
          ...token,
          logoURI: data?.logoURI || "",
          name: data?.name || "",
          symbol: data?.symbol || "",
          decimals: data?.decimals || 0,
        };
      })
    );
    // TODO get token info
    return {
      message: `Found ${tokensData.length} top yield stablecoins/tokens. The user is shown the tokens, do not list them. Ask the user what they want to do with the coin.`,
      body: {
        tokens: tokensData,
      },
    };
  } catch (error) {
    return {
      message: `Error getting top yield tokens: ${error}`,
      body: {
        tokens: [],
      },
    };
  }
}
