import { getToken } from "@/db/services";

import { PublicKey } from "@solana/web3.js";
import type { SolanaActionResult } from "../../solana-action";
import type {
  LiquidStakingYieldsArgumentsType,
  LiquidStakingYieldsEVMResultBodyType,
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

const poolAddress = [
  "0x485bb7ae9875c6d2af1a6007466e0435bd736ea10000000000000000000000c9",
  "0x0bb6579eaf9b20fb8425d3d0e0708462d69f2a0f0000000000000000000000fe",
  "0xe42cc0395c68f73dd16febed82bcc701011864b6000000000000000000000102",
  "0x8894b8381dca1d322453282e01ad6d29fc8450dd000200000000000000000007",
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
): Promise<SolanaActionResult<LiquidStakingYieldsEVMResultBodyType>> {
  try {
    const responses = await Promise.all(
      poolAddress.map(pool =>
        fetch(
          `https://api.jellyverse.org/api/get/apr?poolId=${pool}&networkId=1329`
        ).then(resp => {
          if (!resp.ok) {
            throw new Error(`API Error: ${resp.status} ${resp.statusText}`);
          }
          return resp.json();
        })
      )
    );

    const allTokens = responses.flatMap(item => [
      ...item.pool.tokens.map((t: any) => ({
        ...t,
        poolSymbol: item.pool.symbol,
        tvlManual: item.pool.tvlManual,
      })),
    ]);

    const data = await Promise.all(
      allTokens
        .sort((a, b) => parseFloat(b.tvlManual) - parseFloat(a.tvlManual))
        .map(async (reserve: any) => {
          return {
            ...reserve.token,
            poolSymbol: reserve.poolSymbol,
            tokenData: await getToken(reserve.liquidityTokenMint),
          };
        })
    );
    return {
      message: `Found ${data.length} best liquid staking yields. The user has been shown the options in the UI, ask them which they want to use. DO NOT REITERATE THE OPTIONS IN TEXT.`,
      body: {
        data: data,
      } as LiquidStakingYieldsEVMResultBodyType,
    };
  } catch (error) {
    return {
      message: `Error getting best liquid staking yields: ${error}`,
    };
  }
}
