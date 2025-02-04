"use client";

// import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useBalance } from "wagmi";

export const useNativeBalance = (address: string) => {
  // const { user } = useLogin();
  // console.log("🚀 ~ useNativeBalance ~ address:", address, user);
  // if (user?.wallet?.chainId === "eip155:1329") {
  // }
  const {
    data: balance,
    isLoading,
    error,
  } = useBalance({
    address: address as any,
  });
  // const { data, isLoading, error, mutate } = useSWR(
  //   `native-balance/${address}`,
  //   async () => {
  //     try {
  //       const connection = new Connection(
  //         process.env.NEXT_PUBLIC_SOLANA_RPC_URL!
  //       );
  //       const balance = await connection.getBalance(new PublicKey(address));
  //       return balance / LAMPORTS_PER_SOL;
  //     } catch (error) {
  //       console.error("Error fetching SOL balance:", error);
  //       throw error;
  //     }
  //   }
  // );

  return {
    data: Number(balance?.formatted || "0"),
    isLoading,
    error,
  };
};
