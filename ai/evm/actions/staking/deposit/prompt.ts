import {
  SOLANA_GET_TOKEN_ADDRESS_NAME,
  SOLANA_LIQUID_STAKING_YIELDS_NAME,
} from "../../names";

export const SOLANA_DEPOSIT_PROMPT = `Deposit token for yield using a liquid staking provider. 

There are two parameters, one required and one optional: 

1. Amount of token to stake. (optional)
2. The token address of the liquid staking provider to use.

If a user asks to stake and provides a symbol, use the ${SOLANA_GET_TOKEN_ADDRESS_NAME} tool to get the contract address of the liquid staking provider to use.
If a user asks to stake and provides a name, ask them for the symbol first.

If a user asks to stake without a symbol or a name, use the ${SOLANA_LIQUID_STAKING_YIELDS_NAME} tool to get the best liquid staking yields and ask the user to choose one.`;
