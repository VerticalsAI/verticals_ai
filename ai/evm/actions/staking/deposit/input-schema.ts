import { z } from "zod";

export const DepositInputSchema = z.object({
  amount: z
    .number()
    .positive()
    .optional()
    .describe(
      "The amount of token to stake. Must be a positive number but can be left empty."
    ),
  liquidityToken: z
    .string()
    .describe("The token address of the liquid staking provider to use."),
});
