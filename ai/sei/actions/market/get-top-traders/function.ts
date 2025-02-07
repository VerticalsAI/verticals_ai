import { getTopTraders as getTopTradersBirdeye } from "@/services/birdeye";

import type { SeiActionResult } from "../../sei-action";
import type {
  GetTopTradersArgumentsType,
  GetTopTradersResultBodyType,
} from "./types";

/**
 * Gets the trending tokens from Birdeye API.
 *
 * @param solanaKit - The Solana agent kit instance
 * @param args - The input arguments for the action
 * @returns A message containing the trending tokens information
 */
export async function getTopTraders(
  args: GetTopTradersArgumentsType
): Promise<SeiActionResult<GetTopTradersResultBodyType>> {
  try {
    const response = await getTopTradersBirdeye(args.timeFrame);

    return {
      message: `Found ${response.items.length} top traders. The user is shown the traders, do not list them. Ask the user what they want to do with the traders.`,
      body: {
        traders: response.items,
      },
    };
  } catch (error) {
    return {
      message: `Error getting top traders: ${error}`,
      body: {
        traders: [],
      },
    };
  }
}
