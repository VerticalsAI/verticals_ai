import { Connection } from "@solana/web3.js";

import {
  SolanaAllBalancesAction,
  SolanaBalanceAction,
  SolanaGetTokenAddressAction,
  SolanaGetWalletAddressAction,
  SolanaTransferAction,
} from "@/ai/solana/actions";

import {
  EVM_ALL_BALANCES_NAME,
  EVM_BALANCE_NAME,
  EVM_GET_WALLET_ADDRESS_NAME,
  SOLANA_GET_TOKEN_ADDRESS_NAME,
} from "@/ai/action-names";
import { solanaTool } from "@/ai/solana";
import { EVM_TRANSFER_NAME } from "../../actions/wallet/transfer/name";

export const WALLET_TOOLS = {
  [`wallet-${EVM_GET_WALLET_ADDRESS_NAME}`]: solanaTool(
    new SolanaGetWalletAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${EVM_BALANCE_NAME}`]: solanaTool(
    new SolanaBalanceAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${EVM_ALL_BALANCES_NAME}`]: solanaTool(
    new SolanaAllBalancesAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${SOLANA_GET_TOKEN_ADDRESS_NAME}`]: solanaTool(
    new SolanaGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${EVM_TRANSFER_NAME}`]: solanaTool(
    new SolanaTransferAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
