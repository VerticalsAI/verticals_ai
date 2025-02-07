import { Connection } from "@solana/web3.js";

import {
  SeiAllBalancesAction,
  SeiBalanceAction,
  SeiGetTokenAddressAction,
  SeiGetWalletAddressAction,
} from "@/ai/sei/actions";

import {
  SEI_ALL_BALANCES_NAME,
  SEI_BALANCE_NAME,
  SEI_GET_TOKEN_ADDRESS_NAME,
  SEI_GET_WALLET_ADDRESS_NAME,
} from "@/ai/action-names";
import { seiTool } from "@/ai/sei";

export const WALLET_TOOLS = {
  [`wallet-${SEI_GET_WALLET_ADDRESS_NAME}`]: seiTool(
    new SeiGetWalletAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${SEI_BALANCE_NAME}`]: seiTool(
    new SeiBalanceAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${SEI_ALL_BALANCES_NAME}`]: seiTool(
    new SeiAllBalancesAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${SEI_GET_TOKEN_ADDRESS_NAME}`]: seiTool(
    new SeiGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  // [`wallet-${SEI_TRANSFER_NAME}`]: seiTool(
  //   new SeiTransferAction(),
  //   new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  // ),
};
