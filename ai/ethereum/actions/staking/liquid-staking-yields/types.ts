import { z } from "zod";

import { LiquidStakingYieldsInputSchema } from "./input-schema";

import type { Token } from "@/db/types";
import type { EthereumActionResult } from "../../ethereum-action";

export type LiquidStakingYieldsSchemaType =
  typeof LiquidStakingYieldsInputSchema;

export type LiquidStakingYieldsArgumentsType =
  z.infer<LiquidStakingYieldsSchemaType>;

export type EthereumLiquidStakingYield = {
  // reserve: string;
  // liquidityToken: string;
  // liquidityTokenMint: string;
  // maxLtv: string;
  // borrowApy: string;
  // supplyApy: string;
  // totalSupply: string;
  // totalBorrow: string;
  // totalBorrowUsd: string;
  // totalSupplyUsd: string;
  address: string;
  symbol: string;
  poolSymbol: string;
  apy: string;
  tokenData?: Token;
};

export type EthereumLiquidStakingYieldsResultBodyType = {
  data: EthereumLiquidStakingYield[];
};

export type EthereumLiquidStakingYieldsResultType =
  EthereumActionResult<EthereumLiquidStakingYieldsResultBodyType>;
