import { queryCoingecko } from "./base";
import { TokenSearchResult } from "./types";

interface SearchTokensParams {
  keyword: string;
  verifyToken?: boolean;
  offset?: number;
  limit?: number;
}

export const searchTokens = async ({
  keyword,
}: SearchTokensParams): Promise<TokenSearchResult> => {
  const result = await queryCoingecko<TokenSearchResult[]>(
    "api/v3/coins/list?include_platform=true"
  );

  const tokenSei = result.filter(
    token =>
      token.symbol.toLowerCase() === keyword.toLocaleLowerCase() &&
      token.platforms.hasOwnProperty("sei-v2")
  );

  return tokenSei[0]
    ? tokenSei[0]
    : {
        id: "ibc-bridged-usdt",
        symbol: "usdt",
        name: "IBC Bridged USDT",
        platforms: {
          "sei-v2": "0xb75d0b03c06a926e488e2659df1a861f860bd3d1",
        },
      };
};
