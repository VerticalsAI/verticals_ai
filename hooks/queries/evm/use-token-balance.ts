import { useEffect } from "react";
import { erc20Abi } from "viem";
import { useAccount, useReadContract, useToken } from "wagmi";

export default function useTokenBalanceEvm(tokenAddress: `0x${string}`) {
  const { address } = useAccount();
  const { data, refetch, isLoading } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "balanceOf",
    args: [address as any],
  });
  const result = useToken({
    address: tokenAddress,
  });
  useEffect(() => {
    if (!address) return;
    const intervalId = setInterval(() => {
      refetch();
    }, 10_000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [refetch, address]);

  return {
    data: {
      value: data || BigInt(0),
      decimals: result?.data?.decimals || 18,
      formatted: data
        ? (Number(data) / 10 ** (result?.data?.decimals || 1)).toString()
        : "0",
    },
    refetch,
    isLoading,
  };
}
