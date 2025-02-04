import { z } from "zod";

export const LiquidStakingYieldsInputSchema = z.object({
  stablecoin: z
    .boolean()
    .optional()
    .describe("The mint address of the stablecoin token."),
});
