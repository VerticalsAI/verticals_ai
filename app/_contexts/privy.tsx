"use client";

import {
  PrivyProvider as PrivyProviderBase,
  usePrivy,
} from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { createConfig, WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { arbitrum, base, bsc, mainnet, polygon, sei } from "viem/chains";
import { http, useChainId, useSwitchChain } from "wagmi";

const SwitchNetworkEVM = () => {
  const chainId = useChainId();
  const { user } = usePrivy();
  const { switchChain } = useSwitchChain();
  useEffect(() => {
    if (
      user &&
      user.wallet?.chainType === "ethereum" &&
      ![1329, 42161].includes(chainId)
    ) {
      switchChain({
        chainId: sei.id,
      });
    }
  }, [user, chainId, switchChain]);
  return null;
};

const queryClient = new QueryClient();
export const config = createConfig({
  chains: [sei, mainnet, bsc, polygon, base, arbitrum], // Pass your required chains as an array
  transports: {
    [sei.id]: http(),
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
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
        <WagmiProvider config={config}>
          <SwitchNetworkEVM />
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProviderBase>
  );
};
