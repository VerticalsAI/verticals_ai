import { z } from "zod";

import { TokenLargestAccount } from "@/services/helius";
import { EthereumActionResult } from "../../ethereum-action";
import { TopHoldersInputSchema } from "./input-schema";

export type TopHoldersSchemaType = typeof TopHoldersInputSchema;

export type TopHoldersArgumentsType = z.infer<TopHoldersSchemaType>;

export type TopHoldersResultBodyType = {
  topHolders: (TokenLargestAccount & {
    owner: string;
    percentageOwned: number;
  })[];
  percentageOwned: number;
};

export type TopHoldersResultType =
  EthereumActionResult<TopHoldersResultBodyType>;
