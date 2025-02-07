import { z } from "zod";
import { EVMActionResult } from "../../sei-action";
import { TransferInputSchema } from "./input-schema";

export type SolanaTransferSchemaType = typeof TransferInputSchema;

export type SolanaTransferArgumentsType = z.infer<SolanaTransferSchemaType>;

export type SolanaTransferResultBodyType = {
  amount: number;
  recipient: string;
  token: string;
  transaction: string;
};

export type SolanaTransferResultType =
  EVMActionResult<SolanaTransferResultBodyType>;
