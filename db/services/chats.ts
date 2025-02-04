import "server-only";

import { Message } from "ai";
import { getPgClient } from "../pg-client";
import { Chat } from "../types";

export const convertRowToChat = (data: any): Chat => {
  return {
    id: data.id,
    tagline: data.tagline,
    userId: data.user_id,
    messages: [],
  };
};

export const convertRowToChatMessage = (data: any): Message => {
  return {
    id: data.id,
    createdAt: data.created_at,
    content: data.content,
    experimental_attachments: JSON.parse(data.experimental_attachments),
    role: data.role,
    data: JSON.parse(data.data),
    annotations: JSON.parse(data.annotations),
    toolInvocations: JSON.parse(data.tool_invocations),
  };
};

// CREATE

/**
 * **DATABASE SERVICE**
 *
 * Adds a new chat to the database.
 *
 * @param {Chat} chat - The chat data to be added.
 * @returns {Promise<Chat | null>} The newly created chat or null if creation failed.
 */
export const addChat = async (chat: Chat): Promise<Chat | null> => {
  const client = await getPgClient();
  const text =
    "INSERT INTO chat(id, tagline, user_id) VALUES($1, $2, $3) RETURNING *";
  const values = [chat.id, chat.tagline, chat.userId];
  const res = await client.query(text, values);
  if (res.rowCount === 0) {
    return null;
  }
  if (chat.messages) {
    for (const message of chat.messages) {
      await addMessageToChat(chat.id, chat.userId, message);
    }
  }
  return convertRowToChat(res.rows[0]);
};

// READ

/**
 * **DATABASE SERVICE**
 *
 * Retrieves a chat by its ID and course ID.
 *
 * @param {Chat["id"]} id - The ID of the chat to retrieve.
 * @param {Chat["userId"]} userId - The user ID associated with the chat.
 * @returns {Promise<Chat | null>} The retrieved chat or null if not found.
 */
export const getChat = async (
  id: Chat["id"],
  userId: Chat["userId"]
): Promise<Chat | null> => {
  const client = await getPgClient();
  const text = "SELECT * FROM chat WHERE id=$1 AND user_id=$2";
  const values = [id, userId];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return null;
  }
  const chat = convertRowToChat(res.rows[0]);
  chat.messages = await getChatMessage(id, userId);

  return chat;
};

export const getChatMessage = async (
  id: Chat["id"],
  userId: Chat["userId"]
): Promise<Message[]> => {
  const client = await getPgClient();
  const text = "SELECT * FROM chat_message WHERE chat_id=$1 AND user_id=$2";
  const values = [id, userId];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return [];
  }
  const messages: Message[] = [];
  for (const r of res.rows) {
    messages.push(convertRowToChatMessage(r));
  }

  return messages;
};

/**
 * **DATABASE SERVICE**
 *
 * Finds all chats for a user.
 *
 * @param {Chat["userId"]} userId - The user ID to search for.
 * @returns {Promise<Chat[]>} An array of chats matching the criteria.
 */
export const findChatsByUser = async (
  userId: Chat["userId"]
): Promise<Chat[]> => {
  const client = await getPgClient();
  const text = "SELECT * FROM chat WHERE user_id=$1";
  const values = [userId];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return [];
  }
  return res.rows.map(r => convertRowToChat(r));
};

// UPDATE

/**
 * **DATABASE SERVICE**
 *
 * Updates a chat's tagline.
 *
 * @param {Chat["id"]} id - The ID of the chat to update.
 * @param {Chat["userId"]} userId - The user ID associated with the chat.
 * @param {string} tagline - The new tagline for the chat.
 * @returns {Promise<boolean>} True if the update was successful, false otherwise.
 */
export const updateChatTagline = async (
  id: Chat["id"],
  userId: Chat["userId"],
  tagline: string
): Promise<Chat | null> => {
  const client = await getPgClient();
  const text = "UPDATE chat SET tagline=$1 WHERE id=$2 AND user_id=$3";
  const values = [tagline, id, userId];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return null;
  }
  return convertRowToChat(res.rows[0]);
};

/**
 * **DATABASE SERVICE**
 *
 * Adds a new message to an existing chat.
 *
 * @param {Chat["id"]} id - The ID of the chat to update.
 * @param {Chat["userId"]} userId - The user ID associated with the chat.
 * @param {ChatMessage} message - The message to be added to the chat.
 * @returns {Promise<boolean>} True if the update was successful, false otherwise.
 */
export const addMessageToChat = async (
  id: Chat["id"],
  userId: Chat["userId"],
  message: Message
): Promise<Message | null> => {
  const client = await getPgClient();
  const text =
    "INSERT INTO chat_message(chat_id, user_id, id, created_at, content, experimental_attachments, role, data, annotations, tool_invocations) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
  const values = [
    id,
    userId,
    message.id,
    message.createdAt,
    message.content,
    JSON.stringify(message.experimental_attachments),
    message.role,
    JSON.stringify(message.data),
    JSON.stringify(message.annotations),
    JSON.stringify(message.toolInvocations),
  ];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return null;
  }
  return convertRowToChatMessage(res.rows[0]);
};

/**
 * **DATABASE SERVICE**
 *
 * Updates a chat's messages.
 *
 * @param {Chat["id"]} id - The ID of the chat to update.
 * @param {Chat["userId"]} userId - The user ID associated with the chat.
 * @param {Message[]} messages - The new messages.
 * @returns {Promise<boolean>} True if the update was successful, false otherwise.
 */
export const updateChatMessages = async (
  id: Chat["id"],
  userId: Chat["userId"],
  messages: Message[]
): Promise<Message[]> => {
  const client = await getPgClient();
  const result: Message[] = [];
  const deleteQuery =
    "DELETE FROM chat_message WHERE chat_id=$1 AND user_id=$2";
  const deleteValues = [id, userId];
  await client.query(deleteQuery, deleteValues);
  for (const message of messages) {
    const text =
      "INSERT INTO chat_message(chat_id, user_id, id, created_at, content, experimental_attachments, role, data, annotations, tool_invocations) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    const values = [
      id,
      userId,
      message.id,
      message.createdAt,
      message.content,
      JSON.stringify(message.experimental_attachments),
      message.role,
      JSON.stringify(message.data),
      JSON.stringify(message.annotations),
      JSON.stringify(message.toolInvocations),
    ];
    const res = await client.query(text, values);
    if (res.rowCount == 0) {
      continue;
    }
    result.push(convertRowToChatMessage(res.rows[0]));
  }

  return result;
};

// DELETE

/**
 * **DATABASE SERVICE**
 *
 * Deletes a chat from the database.
 *
 * @param {Chat["id"]} id - The ID of the chat to delete.
 * @param {Chat["userId"]} userId - The user ID associated with the chat.
 * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
 */
export const deleteChat = async (
  chatId: Chat["id"],
  userId: Chat["userId"]
): Promise<boolean> => {
  const client = await getPgClient();

  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM chat_message WHERE chat_id = $1", [chatId]);

    const deleteChatQuery = "DELETE FROM chat WHERE id = $1 AND user_id = $2";
    const deleteChatValues = [chatId, userId];

    const result = await client.query(deleteChatQuery, deleteChatValues);

    await client.query("COMMIT");

    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting chat:", error);
    return false;
  }
};
