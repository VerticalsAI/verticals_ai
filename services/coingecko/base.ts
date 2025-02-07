export const queryCoingecko = async <T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<T> => {
  const url = new URL(`https://api.coingecko.com/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      "x-cg-demo-api-key": process.env.COINGECKO_API_KEY || "",
      accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
};
