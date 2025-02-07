import type { EthereumActionResult } from "../../ethereum-action";
import type {
  EthereumAllBalancesArgumentsType,
  EthereumAllBalancesResultBodyType,
} from "./types";

const tokenInfo = [
  {
    id: "0x0",
    name: "SEI",
    symbol: "SEI",
    decimals: 18,
    tags: [],
    logoURI:
      "https://raw.githubusercontent.com/Sei-Public-Goods/sei-assetlist/main/images/Sei.png",
    freezeAuthority: null,
    mintAuthority: null,
    permanentDelegate: null,
    extensions: {},
  },
  {
    id: "0x3894085ef7ff0f0aedf52e2a2704928d1ec074f1",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    tags: [],
    logoURI:
      "https://raw.githubusercontent.com/Sei-Public-Goods/sei-assetlist/main/images/USDCoin.svg",
    freezeAuthority: null,
    mintAuthority: null,
    permanentDelegate: null,
    extensions: {},
  },
];
export async function getAllBalances(
  args: EthereumAllBalancesArgumentsType
): Promise<EthereumActionResult<EthereumAllBalancesResultBodyType>> {
  try {
    const walletAddress = args.walletAddress;
    const API_KEY = process.env.CROSSMINT_API_KEY!;
    const CROSSMINT_URL = `https://www.crossmint.com/api/v1-alpha2/wallets/${walletAddress}/balances?currencies=usdc%2Csei&chains=sei-pacific-1`;

    const response = await fetch(CROSSMINT_URL, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Crossmint API Error: ${response.statusText}`);
    }

    const data = await response.json();

    const balances = data.map((item: any) => {
      return {
        balance: parseFloat(item.balances["total"]) / 10 ** item.decimals,
        token: item.currency.toUpperCase(),
        name: item.currency,
        logoURI:
          tokenInfo.find(
            token => token.symbol.toLocaleLowerCase() === item.currency
          )?.logoURI || "",
      };
    });

    return {
      message: `The user has been shown all of their balances in the UI.`,
      body: {
        balances: balances,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting balances: ${error}`,
      body: {
        balances: [],
      },
    };
  }
}
