import { Connection } from "@solana/web3.js";

import { SEI_GET_TOKEN_ADDRESS_NAME } from "@/ai/action-names";

import { SeiGetTokenAddressAction, seiTool } from "@/ai/sei";

export const TOKEN_ANALYSIS_TOOLS = {
  // [`tokenanalysis-${SOLANA_GET_TOKEN_DATA_NAME}`]: seiTool(
  //   new SolanaGetTokenDataAction(),
  //   new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  // ),
  // [`tokenanalysis-${SOLANA_TOP_HOLDERS_NAME}`]: seiTool(
  //   new SolanaTopHoldersAction(),
  //   new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  // ),
  // [`tokenanalysis-${SOLANA_TOKEN_HOLDERS_NAME}`]: seiTool(
  //   new SolanaTokenHoldersAction(),
  //   new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  // ),
  [`tokenanalysis-${SEI_GET_TOKEN_ADDRESS_NAME}`]: seiTool(
    new SeiGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  // [`tokenanalysis-${SOLANA_BUBBLE_MAPS_NAME}`]: seiTool(
  //   new SolanaGetBubbleMapsAction(),
  //   new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  // ),
  // [`tokenanalysis-${SOLANA_TOKEN_TOP_TRADERS_NAME}`]: seiTool(
  //   new SolanaTopTokenTradersAction(),
  //   new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  // ),
  // [`tokenanalysis-${SOLANA_TOKEN_PRICE_CHART_NAME}`]: seiTool(
  //   new SolanaTokenPriceChartAction(),
  //   new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  // ),
};
