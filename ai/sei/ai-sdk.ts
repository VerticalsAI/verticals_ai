import { z } from "zod";

import { Connection } from "@solana/web3.js";

import { tool } from "ai";

import { getAllEVMActions } from "./actions";

import type { CoreTool } from "ai";
import type { EVMAction, EVMActionResult, EVMActionSchemaAny } from "./actions";

export const evmTool = <TActionSchema extends EVMActionSchemaAny, TResultBody>(
  action: EVMAction<TActionSchema, TResultBody>,
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
              ) => Promise<EVMActionResult<TResultBody>>
            )(args);
      return result;
    },
  });
};

export const solanaTools = (connection: Connection) =>
  getAllEVMActions().reduce((acc, action) => {
    acc[action.name] = evmTool(action, connection);
    return acc;
  }, {} as Record<string, CoreTool>);
