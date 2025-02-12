import { getToken } from "@/db/services";

import { PublicKey } from "@solana/web3.js";
import type { SolanaActionResult } from "../../solana-action";
import type {
  LiquidStakingYield,
  LiquidStakingYieldsArgumentsType,
  LiquidStakingYieldsResultBodyType,
} from "./types";

const MainMarketAddress = new PublicKey(
  "7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF"
);

const StablecoinAddresses = [
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  "2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo",
  "9zNQRsGLjNKwCUU5Gq5LR8beUCPzQMVMqKAi3SSZh54u",
  "USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA",
  "7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT",
  "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
];

/**
 * Gets the best liquid staking yields from Kamino API.
 *
 * @param args - The input arguments for the action
 * @returns A message containing the best liquid staking yields information
 */
// export async function getLiquidStakingYields(
//   connection: Connection,
//   args: LiquidStakingYieldsArgumentsType
// ): Promise<SolanaActionResult<LiquidStakingYieldsResultBodyType>> {
//   try {
//     console.log("getLiquidStakingYields 1", connection);
//     const slotDuration = await getMedianSlotDurationInMsFromLastEpochs();
//     console.log("getLiquidStakingYields 2", slotDuration);
//     const market = await KaminoMarket.load(
//       connection,
//       MainMarketAddress,
//       slotDuration
//     );
//     console.log("getLiquidStakingYields 3", market);
//     if (!market) {
//       return {
//         message: `Error getting best liquid staking yields`,
//       };
//     }
//     console.log("getLiquidStakingYields 4", market.reserves);
//     const currentSlot = await connection.getSlot();
//     console.log("getLiquidStakingYields 5", currentSlot);
//     const data = await Promise.all(
//       market.reserves.values().map(async (reserve) => {
//         return {
//           supplyApy: `${reserve.totalSupplyAPY(currentSlot)}`,
//           borrowApy: `${reserve.totalSupplyAPY(currentSlot)}`,
//           totalSupply: reserve.getTotalSupply().toString(),
//           totalBorrow: reserve.getTotalSupply().toString(),
//           tokenData: await getTokenBySymbol(
//             reserve.getLiquidityMint().toString()
//           ),
//         };
//       })
//     );
//     console.log("getLiquidStakingYields 6", data);
//     return {
//       message: `Found ${market.reserves.size} best liquid staking yields. The user has been shown the options in the UI, ask them which they want to use. DO NOT REITERATE THE OPTIONS IN TEXT.`,
//       body: {
//         data: data,
//       } as LiquidStakingYieldsResultBodyType,
//     };
//   } catch (error) {
//     return {
//       message: `Error getting best liquid staking yields: ${error}`,
//     };
//   }
// }

/**
 * Gets the best liquid staking yields from Kamino API.
 *
 * @param args - The input arguments for the action
 * @returns A message containing the best liquid staking yields information
 */
export async function getLiquidStakingYields(
  args: LiquidStakingYieldsArgumentsType
): Promise<SolanaActionResult<LiquidStakingYieldsResultBodyType>> {
  try {
    const resp = await fetch(
      "https://api.kamino.finance/kamino-market/7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF/reserves/metrics"
    );
    let reserves: LiquidStakingYield[] = await resp.json();
    if (args.stablecoin) {
      reserves = reserves.filter((r) => {
        console.log(
          "filter stablecoin",
          StablecoinAddresses.indexOf(r.liquidityTokenMint),
          StablecoinAddresses,
          r.liquidityTokenMint
        );
        return StablecoinAddresses.indexOf(r.liquidityTokenMint) !== -1;
      });
    }
    const data = await Promise.all(
      reserves
        .sort((a, b) => parseFloat(b.supplyApy) - parseFloat(a.supplyApy))
        .map(async (reserve) => {
          console.log(reserve);
          return {
            ...reserve,
            tokenData: await getToken(reserve.liquidityTokenMint),
          };
        })
    );
    return {
      message: `Found ${data.length} best liquid staking yields. The user has been shown the options in the UI, ask them which they want to use. DO NOT REITERATE THE OPTIONS IN TEXT.`,
      body: {
        data: data,
      } as LiquidStakingYieldsResultBodyType,
    };
  } catch (error) {
    return {
      message: `Error getting best liquid staking yields: ${error}`,
    };
  }
}
