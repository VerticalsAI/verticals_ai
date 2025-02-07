import { Connection } from "@solana/web3.js";

import {
  EthereumAllBalancesAction,
  EthereumBalanceAction,
  EthereumGetTokenAddressAction,
  EthereumGetWalletAddressAction,
  EthereumTransferAction,
} from "@/ai/ethereum/actions";

import {
  ETHEREUM_ALL_BALANCES_NAME,
  ETHEREUM_BALANCE_NAME,
  ETHEREUM_GET_WALLET_ADDRESS_NAME,
} from "@/ai/action-names";
import { ethereumTool } from "@/ai/ethereum";
import { ETHEREUM_GET_TOKEN_ADDRESS_NAME } from "../../actions/token/names";
import { ETHEREUM_TRANSFER_NAME } from "../../actions/wallet/transfer/name";

export const WALLET_TOOLS = {
  [`wallet-${ETHEREUM_GET_WALLET_ADDRESS_NAME}`]: ethereumTool(
    new EthereumGetWalletAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${ETHEREUM_BALANCE_NAME}`]: ethereumTool(
    new EthereumBalanceAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${ETHEREUM_ALL_BALANCES_NAME}`]: ethereumTool(
    new EthereumAllBalancesAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${ETHEREUM_GET_TOKEN_ADDRESS_NAME}`]: ethereumTool(
    new EthereumGetTokenAddressAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
  [`wallet-${ETHEREUM_TRANSFER_NAME}`]: ethereumTool(
    new EthereumTransferAction(),
    new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  ),
};
