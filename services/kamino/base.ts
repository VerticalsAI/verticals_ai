export const queryKamino = async <T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<T> => {
  const url = new URL(`https://api.kamino.finance/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      "X-API-KEY": process.env.BIRDEYE_API_KEY || "",
      accept: "application/json",
      "x-chain": "solana",
    },
  });

  if (!response.ok) {
    throw new Error(`Kamino API error: ${response.status}`);
  }

  console.log("queryKamino response", JSON.stringify(response));

  return await response.json();
};
