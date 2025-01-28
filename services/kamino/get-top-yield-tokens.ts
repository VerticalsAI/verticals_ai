import { queryKamino } from "./base";
import { TopYieldToken } from "./types/top-yield";

export const getTopYieldTokensKamino = async (
  offset: number = 0,
  limit: number = 20
): Promise<TopYieldToken[]> => {
  return queryKamino<TopYieldToken[]>("v2/staking-yields", {
    sort_by: "rank",
    sort_type: "asc",
    offset,
    limit,
  });
};
