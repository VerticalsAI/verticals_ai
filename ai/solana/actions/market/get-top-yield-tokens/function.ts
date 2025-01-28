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

    return {
      message: `Found ${response.length} top yield tokens. The user is shown the tokens, do not list them. Ask the user what they want to do with the coin.`,
      body: {
        tokens: response,
      },
    };
  } catch (error) {
    return {
      message: `Error getting trending tokens: ${error}`,
      body: {
        tokens: [],
      },
    };
  }
}
