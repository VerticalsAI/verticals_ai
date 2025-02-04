import { useAccount, useWriteContract } from "wagmi";

export default function useSwap() {
  const routerV2 = "0x11DA6463D6Cb5a03411Dbf5ab6f6bc3997Ac7428";
  const { address } = useAccount();
  console.log("🚀 ~ useSwap ~ address:", address);
  const { writeContractAsync } = useWriteContract();
  const handleSwap = async () => {
    console.log("address: ", address);
    if (!address) return;
    const data = await fetch(
      `https://sei-api.dragonswap.app/api/v1/quote?amount=100000000000000000&tokenInAddress=SEI&tokenOutAddress=0x3894085Ef7Ff0f0aeDf52E2A2704928d1Ec074F1&type=exactIn&recipient=${address}&deadline=1200&slippage=0.5&protocols=v2,v3&intent=swap&user=dswap`
    ).then((res) => res.json());
    console.log("data: ", data.methodParameters);
    const contract: any = {
      address: routerV2,
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "deadline",
              type: "uint256",
            },
            {
              internalType: "bytes[]",
              name: "data",
              type: "bytes[]",
            },
          ],
          name: "multicall",
          outputs: [
            {
              internalType: "bytes[]",
              name: "",
              type: "bytes[]",
            },
          ],
          stateMutability: "payable",
          type: "function",
        },
      ],
      functionName: "multicall",
      args: [
        Math.floor(Date.now() / 1000) + 20 * 600,
        [data.methodParameters.calldata],
      ],
      value: BigInt(100000000000000000),
    };
    const res = await writeContractAsync(contract);
    console.log("🚀 ~ handleSwap ~ data:", res);
  };
  return { handleSwap };
}
