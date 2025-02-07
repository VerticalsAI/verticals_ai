import { z } from "zod";
import { SeiActionResult } from "../../sei-action";
import { DepositInputSchema } from "./input-schema";

export type DepositSchemaType = typeof DepositInputSchema;

export type DepositArgumentsType = z.infer<DepositSchemaType>;

export type DepositResultBodyType = {
  tx: string;
  symbol: string;
};

export type DepositResultType = SeiActionResult<DepositResultBodyType>;
