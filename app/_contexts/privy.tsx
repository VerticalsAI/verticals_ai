"use client";

import { PrivyProvider as PrivyProviderBase } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { createConfig, WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base, bsc, mainnet, polygon, sei } from "viem/chains";
import { http } from "wagmi";

// const SwitchNetworkEVM = () => {
//   const chainId = useChainId();
//   const { user } = usePrivy();
//   console.log("🚀 ~ SwitchNetworkEVM ~ chainId:", chainId);
//   const { switchChain } = useSwitchChain();
//   useEffect(() => {
//     console.log("user, ", user);
//     if (
//       user &&
//       user.wallet?.chainType === "ethereum" &&
//       user?.wallet?.chainId !== "eip155:1329"
//     ) {
//       // switchChain({
//       //   chainId: sei.id,
//       // });
//     }
//   }, [user]);
//   return null;
// };

const queryClient = new QueryClient();
export const config = createConfig({
  chains: [sei, mainnet, bsc, polygon, base], // Pass your required chains as an array
  transports: {
    [sei.id]: http(),
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
  },
});
interface Props {
  children: React.ReactNode;
}

const solanaConnectors = toSolanaWalletConnectors({
  shouldAutoConnect: true,
});

export const PrivyProvider: React.FC<Props> = ({ children }) => {
  return (
    <PrivyProviderBase
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#d19900",
          logo: "/images/image-chat.png",
          walletChainType: "ethereum-and-solana",
        },
        supportedChains: [sei],
        externalWallets: {
          solana: {
            connectors: solanaConnectors,
          },
        },
        defaultChain: sei,
        solanaClusters: [
          {
            name: "mainnet-beta",
            rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
          },
        ],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProviderBase>
  );
};
