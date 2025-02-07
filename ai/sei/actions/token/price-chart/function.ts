import type { SeiActionResult } from "../../sei-action";
import type { TokenPriceChartResultBodyType } from "./types";

export async function getPriceChart(): Promise<
  SeiActionResult<TokenPriceChartResultBodyType>
> {
  try {
    return {
      message: `The price chart has been retrieved and displayed to the user. Do not reiterate the raw data.`,
      body: {},
    };
  } catch (error) {
    return {
      message: `Error getting top holders: ${error}`,
    };
  }
}
