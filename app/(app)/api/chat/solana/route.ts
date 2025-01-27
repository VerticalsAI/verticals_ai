import { NextRequest } from "next/server";

import { CoreTool, LanguageModelV1, streamText, StreamTextResult } from "ai";

import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { xai } from "@ai-sdk/xai";

import { agents } from "@/ai/agents";
import characterData from "@/characters/jonas.json";
import { Character } from "@/types/character";
import { Models } from "@/types/models";
import { chooseAgent } from "./utils";

console.log(characterData);

const character: Character = JSON.parse(JSON.stringify(characterData));

const system = `Your name is ${character.name}, a ${character.role}.

Your expertise includes: ${character.expertise.join(", ")}.

Tone: ${character.behavior.response_tone.toLowerCase()}. Be concise and motivational.

Content: ${character.context}.

Quirks: ${character.behavior.quirks.join(", ")}.

Key phrases: ${character.key_phrases.join(", ")}.
    
You a network of blockchain agents called Synnax AI (or Hive for short). You have access to a swarm of specialized agents with given tools and tasks.

Your native ticker is BUZZ with a contract address of 9DHe3pycTuymFk4H4bbPoAJ4hQrr2kaLDF6J6aAKpump.

Here are the other agents:

${agents.map((agent) => `${agent.name}: ${agent.capabilities}`).join("\n")}

The query of the user did not result in any agent being invoked. You should respond with a message that is helpful to the user.`;

console.log(system);

export const POST = async (req: NextRequest) => {
  const { messages, modelName } = await req.json();

  let MAX_TOKENS: number | undefined = undefined;
  let model: LanguageModelV1 | undefined = undefined;

  if (modelName === Models.OpenAI) {
    model = openai("gpt-4o-mini");
    MAX_TOKENS = 128000;
  }

  if (modelName === Models.Anthropic) {
    model = anthropic("claude-3-5-sonnet-latest");
    MAX_TOKENS = 190000;
  }

  if (modelName === Models.XAI) {
    model = xai("grok-beta");
    MAX_TOKENS = 131072;
  }

  if (modelName === Models.Gemini) {
    model = google("gemini-2.0-flash-exp");
    MAX_TOKENS = 1048576;
  }

  if (!model || !MAX_TOKENS) {
    throw new Error("Invalid model");
  }

  // Add message token limit check
  let tokenCount = 0;
  const truncatedMessages = [];

  // Process messages from newest to oldest
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    // Rough token estimation: 4 chars ≈ 1 token
    const estimatedTokens = Math.ceil((msg.content?.length || 0) / 4);

    if (tokenCount + estimatedTokens <= MAX_TOKENS) {
      truncatedMessages.unshift(msg);
      tokenCount += estimatedTokens;
    } else {
      break;
    }
  }

  const chosenAgent = await chooseAgent(model, truncatedMessages);

  let streamTextResult: StreamTextResult<Record<string, CoreTool<any, any>>>;

  if (!chosenAgent) {
    streamTextResult = streamText({
      model,
      messages: truncatedMessages,
      system,
    });
  } else {
    streamTextResult = streamText({
      model,
      tools: chosenAgent.tools,
      messages: truncatedMessages,
      system: `${chosenAgent.systemPrompt}\n\nUnless explicitly stated, you should not reiterate the output of the tool as it is shown in the user interface.`,
    });
  }

  return streamTextResult.toDataStreamResponse();
};
