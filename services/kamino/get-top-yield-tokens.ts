import { queryKamino } from "./base";
import { TopYieldToken } from "./types/top-yield";

export const getTopYieldTokensKamino = async (): Promise<TopYieldToken[]> => {
  return queryKamino<TopYieldToken[]>("v2/staking-yields");
};
