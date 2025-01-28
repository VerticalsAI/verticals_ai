import { getTopYieldTokensKamino } from "@/services/kamino";
import type { SolanaActionResult } from "../../solana-action";
import type {
  GetTopYieldTokensArgumentsType,
  GetTopYieldTokensResultBodyType,
} from "./types";

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
    return {
      message: `Found ${tokens.length} top yield stablecoins/tokens. The user is shown the tokens, do not list them. Get token data by tokenMint and Ask the user what they want to do with the coin.`,
      body: {
        tokens,
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
