import { Connection } from "@solana/web3.js";

import { SEI_GET_WALLET_ADDRESS_NAME } from "@/ai/action-names";

import { SeiGetWalletAddressAction } from "../../actions";
import { seiTool } from "../../ai-sdk";

export const LIQUIDITY_TOOLS = {
  // [`liquidity-${SOLANA_GET_POOLS_NAME}`]: solanaTool(new SolanaGetPoolsAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
  // [`liquidity-${SOLANA_DEPOSIT_LIQUIDITY_NAME}`]: solanaTool(new SolanaDepositLiquidityAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
  // [`liquidity-${SOLANA_GET_LP_TOKENS_NAME}`]: solanaTool(new SolanaGetLpTokensAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
  [`liquidity-${SEI_GET_WALLET_ADDRESS_NAME}`]: seiTool(
    new SeiGetWalletAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  // [`liquidity-${SOLANA_WITHDRAW_LIQUIDITY_NAME}`]: solanaTool(new SolanaWithdrawLiquidityAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
};
