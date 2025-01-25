import { NextRequest, NextResponse } from "next/server";

import { addChat, getChat, updateChatMessages } from "@/db/services";

import { privy } from "@/services/privy";
import { openai } from "@ai-sdk/openai";
import { generateText, Message } from "ai";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) => {
  const { chatId } = await params;
  try {
    // Get the authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(null, { status: 401 });
    }
    // Extract the token
    const token = authHeader.split(" ")[1];

    // Verify the token with Privy
    const { userId } = await privy.verifyAuthToken(token);
    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json(await getChat(chatId, userId));
  } catch (error) {
    console.error("Error in /api/chats/[chatId]:", error);
    return NextResponse.json(null, { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) => {
  const { chatId } = await params;

  const { messages } = await req.json();

  try {
    // Get the authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(false, { status: 401 });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Verify the token with Privy
    const { userId } = await privy.verifyAuthToken(token);
    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const chat = await getChat(chatId, userId);

    if (!chat) {
      return NextResponse.json(
        await addChat({
          id: chatId,
          userId,
          messages,
          tagline: await generateTagline(messages),
        })
      );
    } else {
      return NextResponse.json(
        await updateChatMessages(chatId, userId, messages)
      );
    }
  } catch (error) {
    console.error("Error in /api/chats/[chatId]:", error);
    return NextResponse.json(false, { status: 500 });
  }
};

const generateTagline = async (messages: Omit<Message, "id">[]) => {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    messages: [
      messages[0],
      {
        role: "user",
        content:
          "Generate a 3-5 word description of the chat. Do not include any quotation marks or other punctuation.",
      },
    ],
  });

  return text;
};
