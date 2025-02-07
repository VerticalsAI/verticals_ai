import type { EVMAction } from "../../sei-action";
import { getLiquidStakingYields } from "./function";
import { LiquidStakingYieldsInputSchema } from "./input-schema";
import { EVM_LIQUID_STAKING_YIELDS_NAME } from "./name";
import { EVM_LIQUID_STAKING_YIELDS_PROMPT } from "./prompt";
import type { LiquidStakingYieldsEVMResultBodyType } from "./types";

export class EVMLiquidStakingYieldsAction
  implements
    EVMAction<
      typeof LiquidStakingYieldsInputSchema,
      LiquidStakingYieldsEVMResultBodyType
    >
{
  public name = EVM_LIQUID_STAKING_YIELDS_NAME;
  public description = EVM_LIQUID_STAKING_YIELDS_PROMPT;
  public argsSchema = LiquidStakingYieldsInputSchema;
  public func = getLiquidStakingYields;
}
