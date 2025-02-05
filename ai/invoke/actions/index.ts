import { InvokeAgentAction } from "./invoke-agent";

import { agents } from "@/ai/evm/agents";
import type { InvokeAction, InvokeActionSchemaAny } from "./invoke-action";

export function getAllInvokeActions(): InvokeAction<
  InvokeActionSchemaAny,
  any
>[] {
  return [new InvokeAgentAction(agents)];
}

export const INVOKE_ACTIONS = getAllInvokeActions();

export * from "./invoke-action";
export * from "./types";
