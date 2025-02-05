import { z } from "zod";

import { LiquidStakingYieldsInputSchema } from "./input-schema";

import type { Token } from "@/db/types";
import type { SolanaActionResult } from "../../solana-action";

export type LiquidStakingYieldsSchemaType =
  typeof LiquidStakingYieldsInputSchema;

export type LiquidStakingYieldsArgumentsType =
  z.infer<LiquidStakingYieldsSchemaType>;

export type LiquidStakingYield = {
  reserve: string;
  liquidityToken: string;
  liquidityTokenMint: string;
  maxLtv: string;
  borrowApy: string;
  supplyApy: string;
  totalSupply: string;
  totalBorrow: string;
  totalBorrowUsd: string;
  totalSupplyUsd: string;
  tokenData?: Token;
};

export type LiquidStakingYieldsResultBodyType = {
  data: LiquidStakingYield[];
};

export type LiquidStakingYieldsResultType =
  SolanaActionResult<LiquidStakingYieldsResultBodyType>;
