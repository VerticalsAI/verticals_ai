import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import { getAssociatedTokenAddressSync } from "@solana/spl-token";

import { getToken } from "@/db/services";
import type { EVMActionResult } from "../../evm-action";
import type { BalanceArgumentsType, BalanceResultBodyType } from "./types";

export async function getBalance(
  connection: Connection,
  args: BalanceArgumentsType
): Promise<EVMActionResult<BalanceResultBodyType>> {
  try {
    let balance: number;

    if (!args.tokenAddress) {
      // Get SOL balance
      balance =
        (await connection.getBalance(new PublicKey(args.walletAddress))) /
        LAMPORTS_PER_SOL;
    } else {
      // Get token balance
      const token_address = getAssociatedTokenAddressSync(
        new PublicKey(args.tokenAddress),
        new PublicKey(args.walletAddress)
      );

      const token_account = await connection.getTokenAccountBalance(
        token_address
      );
      balance = token_account.value.uiAmount ?? 0;
    }

    const tokenData = args.tokenAddress
      ? await getToken(args.tokenAddress)
      : null;
    const tokenSymbol = tokenData?.symbol || "SOL";
    const tokenName = tokenData?.name || "Solana";
    const tokenLogoURI =
      tokenData?.logoURI ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX6PYmAiDpUliZWnmCHKPc3VI7QESDKhLndQ&s";

    return {
      message: `Balance: ${balance} ${tokenSymbol}`,
      body: {
        balance: balance,
        token: tokenSymbol,
        name: tokenName,
        logoURI: tokenLogoURI,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting balance: ${error}`,
    };
  }
}
