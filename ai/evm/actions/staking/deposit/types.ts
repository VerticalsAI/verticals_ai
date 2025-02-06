import { z } from "zod";
import { EVMActionResult } from "../../evm-action";
import { DepositInputSchema } from "./input-schema";

export type DepositSchemaType = typeof DepositInputSchema;

export type DepositArgumentsType = z.infer<DepositSchemaType>;

export type DepositResultBodyType = {
  tx: string;
  symbol: string;
};

export type DepositResultType = EVMActionResult<DepositResultBodyType>;
