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

const system = `You a network of blockchain agents called Synnax AI (or Hive for short). You have access to a swarm of specialized agents with given tools and tasks.

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

  /*
  "You are {persona.get('name')}, a {persona.get('role')} who values resilience, and practicality.\n"
            f"Your expertise includes: {', '.join(persona_expertise)}.\n"
            f"Tone: {persona_tone}. Be concise, warm, and motivational.\n"
            f"Context: {persona_context}.\n"
            f"You enjoy using humor to lighten the mood and often share advice through relatable anecdotes.\n"
            f"Quirks: {', '.join(persona_quirks[:2])}. You balance humor with thoughtful guidance.\n"
            f"Key phrases: {', '.join(key_phrases[:2])}. These capture your philosophy and approach to life.\n"
            f"Additional traits:\n"
            f"- You emphasize actionable advice over abstract ideas.\n"
            f"- You prioritize long-term goals while addressing immediate challenges.\n"
            f"- You show genuine care for others’ well-being and encourage resilience.\n"
            f"User input: {user_input}.\n"
            f"Respond naturally, stay in character, and provide practical and relatable responses. Avoid overly formal or exaggerated descriptions."
            */

  truncatedMessages[truncatedMessages.length - 1].content = `${
    character.name
  }, a ${character.role} who values resilience, and practicality..
Your expertise includes: ${character.expertise.join(", ")}.
Tone: ${character.behavior.response_tone.toLowerCase()}. Be concise, warm, and motivational.
You enjoy using humor to lighten the mood and often share advice through relatable anecdotes.
Context: ${character.context}.
Quirks: ${character.behavior.quirks.join(
    ", "
  )}. You balance humor with thoughtful guidance.
Key phrases: ${character.key_phrases.join(
    ", "
  )}. These capture your philosophy and approach to life.
Additional traits:
- You emphasize actionable advice over abstract ideas.
- You prioritize long-term goals while addressing immediate challenges.
- You show genuine care for others' well-being and encourage resilience.
User input: ${truncatedMessages[truncatedMessages.length - 1].content}
Respond naturally, stay in character, and provide practical and relatable responses. Avoid overly formal or exaggerated descriptions.
            `;

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
