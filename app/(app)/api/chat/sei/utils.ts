import { z } from "zod";

import { generateObject, LanguageModelV1, Message } from "ai";

import { Agent } from "@/ai/agent";
import { agents } from "@/ai/sei/agents";

export const system = `You are the orchestrator of a swarm of blockchain agents that each have specialized tasks.

Given this list of agents and their capabilities, choose the one that is most appropriate for the user's request.

${agents.map(agent => `${agent.name}: ${agent.systemPrompt}`).join("\n")}`;

export const chooseAgent = async (
  model: LanguageModelV1,
  messages: Message[]
): Promise<Agent | null> => {
  const { object } = await generateObject({
    model,
    schema: z.object({
      agent: z.enum(agents.map(agent => agent.name) as [string, ...string[]]),
    }),
    messages,
    system,
  });

  //   console.log(
  //     "chooseAgent",
  //     JSON.stringify({ system, messages, result: object })
  //   );

  return agents.find(agent => agent.name === object.agent) ?? null;
};
