import "server-only";

import { Message } from "ai";
import { getPgClient } from "../pg-client";
import { Chat } from "../types";

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
  if (chat.messages) {
    for (const message of chat.messages) {
      await addMessageToChat(chat.id, chat.userId, message);
    }
  }
  return res.rows[0];
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
  if (res.rows.length == 0) {
    return null;
  }
  const chat: Chat = {
    id: res.rows[0].id,
    tagline: res.rows[0].tagline,
    userId: res.rows[0].user_id,
    messages: [],
  };

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

  const messages: Message[] = [];
  for (const r of res.rows) {
    messages.push({
      id: r.id,
      createdAt: r.created_at,
      content: r.content,
      experimental_attachments: JSON.parse(r.experimental_attachments),
      role: r.role,
      data: JSON.parse(r.data),
      annotations: JSON.parse(r.annotations),
      toolInvocations: JSON.parse(r.tool_invocations),
    });
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
  return res.rows;
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
): Promise<boolean> => {
  const client = await getPgClient();
  const text = "UPDATE chat SET tagline=$1 WHERE id=$2 AND user_id=$3";
  const values = [tagline, id, userId];
  const res = await client.query(text, values);
  return res.rows[0];
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
): Promise<boolean> => {
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
  return res.rows[0];
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
  await client.query<Message>(deleteQuery, deleteValues);
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
    const res = await client.query<Message>(text, values);
    result.push(res.rows[0]);
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
  id: Chat["id"],
  userId: Chat["userId"]
): Promise<boolean> => {
  const client = await getPgClient();
  const deleteQuery =
    "DELETE FROM chat_message WHERE chat_id=$1 AND user_id=$2";
  const deleteValues = [id, userId];
  await client.query<Message>(deleteQuery, deleteValues);
  return true;
};
