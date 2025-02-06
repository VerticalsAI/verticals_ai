import { Connection } from "@solana/web3.js";

import {
  EVMAllBalancesAction,
  EVMBalanceAction,
  EVMGetTokenAddressAction,
  EVMGetWalletAddressAction,
  EVMTransferAction,
} from "@/ai/evm/actions";

import {
  EVM_ALL_BALANCES_NAME,
  EVM_BALANCE_NAME,
  EVM_GET_WALLET_ADDRESS_NAME,
  SOLANA_GET_TOKEN_ADDRESS_NAME,
} from "@/ai/action-names";
import { evmTool } from "@/ai/evm";
import { EVM_TRANSFER_NAME } from "../../actions/wallet/transfer/name";

export const WALLET_TOOLS = {
  [`wallet-${EVM_GET_WALLET_ADDRESS_NAME}`]: evmTool(
    new EVMGetWalletAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${EVM_BALANCE_NAME}`]: evmTool(
    new EVMBalanceAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${EVM_ALL_BALANCES_NAME}`]: evmTool(
    new EVMAllBalancesAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${SOLANA_GET_TOKEN_ADDRESS_NAME}`]: evmTool(
    new EVMGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${EVM_TRANSFER_NAME}`]: evmTool(
    new EVMTransferAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
