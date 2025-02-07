import type { EthereumAction } from "../../ethereum-action";
import { getLiquidStakingYields } from "./function";
import { LiquidStakingYieldsInputSchema } from "./input-schema";
import { ETHEREUM_LIQUID_STAKING_YIELDS_NAME } from "./name";
import { ETHEREUM_LIQUID_STAKING_YIELDS_PROMPT } from "./prompt";
import type { EthereumLiquidStakingYieldsResultBodyType } from "./types";

export class EthereumLiquidStakingYieldsAction
  implements
    EthereumAction<
      typeof LiquidStakingYieldsInputSchema,
      EthereumLiquidStakingYieldsResultBodyType
    >
{
  public name = ETHEREUM_LIQUID_STAKING_YIELDS_NAME;
  public description = ETHEREUM_LIQUID_STAKING_YIELDS_PROMPT;
  public argsSchema = LiquidStakingYieldsInputSchema;
  public func = getLiquidStakingYields;
}
