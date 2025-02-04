import { PublicClient, createPublicClient, fallback, http } from "viem";
import { sei } from "viem/chains";

export const CHAINS = [sei];
export const PUBLIC_NODES: any = {
  [sei.id]: ["https://evm-rpc.sei-apis.com"],
};

export enum ChainId {
  SEI = sei.id,
}

export type CreatePublicClientParams = {
  transportSignal?: AbortSignal;
};

export function createViemPublicClients({
  transportSignal,
}: CreatePublicClientParams = {}) {
  return CHAINS.reduce((prev, cur) => {
    return {
      ...prev,
      [cur.id]: createPublicClient({
        chain: cur,
        transport: fallback(
          (PUBLIC_NODES[cur.id] as string[]).map((url) =>
            http(url, {
              timeout: 10_000,
              fetchOptions: {
                signal: transportSignal,
              },
            })
          ),
          {
            rank: false,
          }
        ),
        batch: {
          multicall: {
            batchSize: 1024 * 200,
            wait: 16,
          },
        },
        pollingInterval: 6_000,
      }),
    };
  }, {} as Record<ChainId, PublicClient>);
}

export const viemClients = createViemPublicClients();

export const getViemClients = createViemPublicClientGetter({ viemClients });

type CreateViemPublicClientGetterParams = {
  viemClients?: Record<ChainId, PublicClient>;
} & CreatePublicClientParams;

export function createViemPublicClientGetter({
  viemClients: viemClientsOverride,
  ...restParams
}: CreateViemPublicClientGetterParams = {}) {
  const clients = viemClientsOverride || createViemPublicClients(restParams);

  return function getClients({ chainId }: { chainId?: ChainId }): PublicClient {
    return clients[chainId as ChainId];
  };
}

export const CLIENT_CONFIG = {
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
};

export const publicClient = ({ chainId = sei.id }: { chainId?: ChainId }) => {
  if (chainId && viemClients[chainId]) {
    return viemClients[chainId];
  }
  const httpString =
    chainId && PUBLIC_NODES[chainId][0] ? PUBLIC_NODES[chainId][0] : undefined;

  const chain = CHAINS.find((c) => c.id === chainId);

  return createPublicClient({
    chain,
    transport: http(httpString),
    ...CLIENT_CONFIG,
  });
};
