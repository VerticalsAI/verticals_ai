import { Connection } from "@solana/web3.js";

import type { EVMActionResult } from "../../evm-action";
import type {
  AllBalancesEVMArgumentsType,
  AllBalancesEVMResultBodyType,
} from "./types";

export async function getAllBalances(
  connection: Connection,
  args: AllBalancesEVMArgumentsType
): Promise<EVMActionResult<AllBalancesEVMResultBodyType>> {
  try {
    let balances: {
      balance: number;
      token: string;
      name: string;
      logoURI: string;
    }[] = [
      {
        balance: 0,
        token: "SOL",
        name: "Solana",
        logoURI:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX6PYmAiDpUliZWnmCHKPc3VI7QESDKhLndQ&s",
      },
    ];

    // Get SOL balance
    // const solBalance =
    //   (await connection.getBalance(new PublicKey(args.walletAddress))) /
    //   LAMPORTS_PER_SOL;
    // balances.push({
    //   balance: solBalance,
    //   token: "SOL",
    //   name: "Solana",
    //   logoURI:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX6PYmAiDpUliZWnmCHKPc3VI7QESDKhLndQ&s",
    // });

    // // Get all token accounts
    // const tokenAccounts = await getTokenAccountsByOwner(args.walletAddress);

    // // Get balance for each token account
    // for await (const account of tokenAccounts) {
    //   const token = await getToken(account.mint!);
    //   if (token) {
    //     balances.push({
    //       balance: account.amount! / 10 ** token.decimals,
    //       token: token.symbol,
    //       name: token.name,
    //       logoURI: token.logoURI,
    //     });
    //   }
    // }

    return {
      message: `The user has been shown all of their balances in the UI. You do not need to list the balances again, instead ask what they want to do next.`,
      body: {
        balances: balances,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting balances: ${error}`,
      body: {
        balances: [],
      },
    };
  }
}
