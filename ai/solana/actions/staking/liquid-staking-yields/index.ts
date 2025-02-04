import type { SolanaAction } from "../../solana-action";
import { getLiquidStakingYields } from "./function";
import { LiquidStakingYieldsInputSchema } from "./input-schema";
import { SOLANA_LIQUID_STAKING_YIELDS_NAME } from "./name";
import { SOLANA_LIQUID_STAKING_YIELDS_PROMPT } from "./prompt";
import type { LiquidStakingYieldsResultBodyType } from "./types";

export class SolanaLiquidStakingYieldsAction
  implements
    SolanaAction<
      typeof LiquidStakingYieldsInputSchema,
      LiquidStakingYieldsResultBodyType
    >
{
  public name = SOLANA_LIQUID_STAKING_YIELDS_NAME;
  public description = SOLANA_LIQUID_STAKING_YIELDS_PROMPT;
  public argsSchema = LiquidStakingYieldsInputSchema;
  public func = getLiquidStakingYields;
}
