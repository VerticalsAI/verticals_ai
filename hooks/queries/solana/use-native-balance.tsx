"use client";

import { useLogin } from "@/hooks/privy";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import useSWR from "swr";
// import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useBalance } from "wagmi";

export const useNativeBalance = (address: string) => {
  const { user } = useLogin();
  // console.log("🚀 ~ useNativeBalance ~ address:", address, user);
  // if (user?.wallet?.chainId === "eip155:1329") {
  // }
  const isEVM = user?.wallet?.chainType === "ethereum";
  const {
    data: balance,
    isLoading: loadingEVM,
    error: errorEVM,
  } = useBalance({
    address: address as any,
  });
  const {
    data: balanceSOL,
    isLoading: loadingSol,
    error: errorSol,
    mutate,
  } = useSWR(`native-balance/${address}`, async () => {
    try {
      const connection = new Connection(
        process.env.NEXT_PUBLIC_SOLANA_RPC_URL!
      );
      const balance = await connection.getBalance(new PublicKey(address));
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error("Error fetching SOL balance:", error);
      throw error;
    }
  });

  const isLoading = isEVM ? loadingEVM : loadingSol;
  const error = isEVM ? errorEVM : errorSol;
  const data = isEVM ? Number(balance?.formatted || "0") : balanceSOL || 0;
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
