import { getTokenLargestAccounts } from "@/services/helius";
import { getAccount } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import type { SeiActionResult } from "../../sei-action";
import type {
  TopHoldersArgumentsType,
  TopHoldersResultBodyType,
} from "./types";

export async function getTopHolders(
  args: TopHoldersArgumentsType
): Promise<SeiActionResult<TopHoldersResultBodyType>> {
  try {
    let topHolders = await getTokenLargestAccounts(args.tokenAddress);

    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
    await Promise.all(
      topHolders.map(async holder => {
        const tokenAccount = await getAccount(
          connection,
          new PublicKey(holder.address)
        );
      })
    );

    const mintInfo = await connection.getTokenSupply(
      new PublicKey(args.tokenAddress)
    );
    const totalSupply = Number(
      BigInt(mintInfo.value.amount) /
        BigInt(Math.pow(10, mintInfo.value.decimals))
    );

    return {
      message: `The top holders have been retrieved and displayed to the user. Now ask them what they want to do next.`,
      body: {
        topHolders: await Promise.all(
          topHolders.map(async holder => {
            const tokenAccount = await getAccount(
              connection,
              new PublicKey(holder.address)
            );
            return {
              ...holder,
              owner: tokenAccount.owner.toString(),
              percentageOwned: (holder.uiAmount / totalSupply) * 100,
            };
          })
        ),
        percentageOwned:
          topHolders.reduce((acc, holder) => acc + Number(holder.uiAmount), 0) /
          totalSupply,
      },
    };
  } catch (error) {
    return {
      message: `Error getting top holders: ${error}`,
    };
  }
}
