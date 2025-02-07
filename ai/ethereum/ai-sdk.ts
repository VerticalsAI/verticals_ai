import { z } from "zod";

import { Connection } from "@solana/web3.js";

import { tool } from "ai";

import { getAllEthereumActions } from "./actions";

import type { CoreTool } from "ai";
import type {
  EthereumAction,
  EthereumActionResult,
  EthereumActionSchemaAny,
} from "./actions";

export const ethereumTool = <
  TActionSchema extends EthereumActionSchemaAny,
  TResultBody
>(
  action: EthereumAction<TActionSchema, TResultBody>,
  connection: Connection
) => {
  if (!action.func) {
    return tool({
      description: action.description,
      parameters: action.argsSchema,
    });
  }
  const func = action.func;
  return tool({
    description: action.description,
    parameters: action.argsSchema,
    execute: async args => {
      const result =
        func.length === 2
          ? await func(connection, args)
          : await (
              func as (
                args: z.infer<TActionSchema>
              ) => Promise<EthereumActionResult<TResultBody>>
            )(args);
      return result;
    },
  });
};

export const solanaTools = (connection: Connection) =>
  getAllEthereumActions().reduce((acc, action) => {
    acc[action.name] = ethereumTool(action, connection);
    return acc;
  }, {} as Record<string, CoreTool>);
