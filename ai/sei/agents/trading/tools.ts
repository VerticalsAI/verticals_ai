import { Connection } from "@solana/web3.js";

import { SEI_GET_TOKEN_ADDRESS_NAME, SEI_TRADE_NAME } from "@/ai/action-names";
import { SeiGetTokenAddressAction, seiTool, SeiTradeAction } from "@/ai/sei";

export const TRADING_TOOLS = {
  [`trading-${SEI_TRADE_NAME}`]: seiTool(
    new SeiTradeAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`trading-${SEI_GET_TOKEN_ADDRESS_NAME}`]: seiTool(
    new SeiGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
