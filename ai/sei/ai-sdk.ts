import { z } from "zod";

import { Connection } from "@solana/web3.js";

import { tool } from "ai";

import { getAllSeiActions } from "./actions";

import type { CoreTool } from "ai";
import type { SeiAction, SeiActionResult, SeiActionSchemaAny } from "./actions";

export const seiTool = <TActionSchema extends SeiActionSchemaAny, TResultBody>(
  action: SeiAction<TActionSchema, TResultBody>,
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
              ) => Promise<SeiActionResult<TResultBody>>
            )(args);
      return result;
    },
  });
};

export const seiTools = (connection: Connection) =>
  getAllSeiActions().reduce((acc, action) => {
    acc[action.name] = seiTool(action, connection);
    return acc;
  }, {} as Record<string, CoreTool>);
