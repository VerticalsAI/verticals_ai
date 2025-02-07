import type { SeiAction } from "../../sei-action";
import { getLiquidStakingYields } from "./function";
import { LiquidStakingYieldsInputSchema } from "./input-schema";
import { SEI_LIQUID_STAKING_YIELDS_NAME } from "./name";
import { SEI_LIQUID_STAKING_YIELDS_PROMPT } from "./prompt";
import type { SeiLiquidStakingYieldsResultBodyType } from "./types";

export class SeiLiquidStakingYieldsAction
  implements
    SeiAction<
      typeof LiquidStakingYieldsInputSchema,
      SeiLiquidStakingYieldsResultBodyType
    >
{
  public name = SEI_LIQUID_STAKING_YIELDS_NAME;
  public description = SEI_LIQUID_STAKING_YIELDS_PROMPT;
  public argsSchema = LiquidStakingYieldsInputSchema;
  public func = getLiquidStakingYields;
}
