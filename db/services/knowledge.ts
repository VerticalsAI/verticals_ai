import "server-only";

import pgvector from "pgvector/pg";
import { getPgClient } from "../pg-client";
import { Knowledge, KnowledgeInput } from "../types";

export const convertRowToKnowledge = (data: any): Knowledge => {
  return {
    id: data.id,
    baseUrl: data.base_url,
    name: data.name,
    summary: data.summary,
    summaryEmbedding: data.summary_embedding,
    markdown: data.markdown,
    url: data.url,
    title: data.title,
    description: data.description,
    favicon: data.favicon,
  };
};

// CREATE

/**
 * **DATABASE SERVICE**
 *
 * Adds a new knowledge entry to the database.
 *
 * @param {KnowledgeInput} knowledge - The knowledge data to be added.
 * @returns {Promise<Knowledge | null>} The newly created knowledge entry or null if creation failed.
 */
export const addKnowledge = async (
  knowledge: KnowledgeInput
): Promise<Knowledge | null> => {
  const client = await getPgClient();
  const text =
    "INSERT INTO knowledge(base_url, name, summary, summary_embedding, markdown, url, title, description, favicon) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
  const values = [
    knowledge.baseUrl,
    knowledge.name,
    knowledge.summary,
    pgvector.toSql(knowledge.summaryEmbedding),
    knowledge.markdown,
    knowledge.url,
    knowledge.title,
    knowledge.description,
    knowledge.favicon,
  ];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return null;
  }
  return convertRowToKnowledge(res.rows[0]);
};

// READ

/**
 * **DATABASE SERVICE**
 *
 * Retrieves a knowledge entry by its ID and base URL.
 *
 * @param {Knowledge["id"]} id - The ID of the knowledge entry to retrieve.
 * @param {Knowledge["baseUrl"]} baseUrl - The base URL associated with the knowledge entry.
 * @returns {Promise<Knowledge | null>} The retrieved knowledge entry or null if not found.
 */
export const getKnowledge = async (
  id: Knowledge["id"],
  baseUrl: Knowledge["baseUrl"]
): Promise<Knowledge | null> => {
  const client = await getPgClient();
  const text = "SELECT * FROM knowledge WHERE id=$1 AND base_url=$2";
  const values = [id, baseUrl];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return null;
  }
  return convertRowToKnowledge(res.rows[0]);
};

/**
 * **DATABASE SERVICE**
 *
 * Finds all knowledge entries for a base URL.
 *
 * @param {Knowledge["baseUrl"]} baseUrl - The base URL to search for.
 * @returns {Promise<Knowledge[]>} An array of knowledge entries matching the criteria.
 */
export const findKnowledgeByBaseUrl = async (
  baseUrl: Knowledge["baseUrl"]
): Promise<Knowledge[]> => {
  const client = await getPgClient();
  const text = "SELECT * FROM knowledge WHERE base_url=$1";
  const values = [baseUrl];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return [];
  }
  return res.rows.map((r) => convertRowToKnowledge(r));
};

/**
 * **DATABASE SERVICE**
 *
 * Finds relevant knowledge entries based on a vector query.
 *
 * @param {Knowledge["baseUrl"]} baseUrl - The base URL to search within.
 * @param {number[]} query - The vector query to find relevant knowledge entries.
 * @returns {Promise<(Knowledge & { distance: number })[]>} An array of knowledge entries with their distances to the query vector.
 */
export const findRelevantKnowledge = async (
  query: number[]
): Promise<(Knowledge & { distance: number })[]> => {
  const client = await getPgClient();
  const text =
    "SELECT *, summary_embedding <-> $1 AS distance FROM knowledge ORDER BY summary_embedding <-> $2 LIMIT 10";
  const values = [pgvector.toSql(query), pgvector.toSql(query)];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return [];
  }
  console.log("findRelevantKnowledge", res);
  return res.rows.map((r) => ({
    ...convertRowToKnowledge(r),
    distance: r.distance,
  }));
};

/**
 * **DATABASE SERVICE**
 *
 * Finds all knowledge entries for a URL.
 *
 * @param {string} url - The URL to search for.
 * @returns {Promise<Knowledge[]>} An array of knowledge entries matching the criteria.
 */
export const findKnowledgeByUrl = async (url: string): Promise<Knowledge[]> => {
  const client = await getPgClient();
  const text = "SELECT * FROM knowledge WHERE url=$1";
  const values = [url];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return [];
  }
  return res.rows.map((r) => convertRowToKnowledge(r));
};

// UPDATE

/**
 * **DATABASE SERVICE**
 *
 * Updates a knowledge entry's markdown and embedding.
 *
 * @param {Knowledge["id"]} id - The ID of the knowledge entry to update.
 * @param {Knowledge["baseUrl"]} baseUrl - The base URL associated with the knowledge entry.
 * @param {string} markdown - The new markdown content.
 * @param {number[]} markdownEmbedding - The new markdown embedding.
 * @returns {Promise<boolean>} True if the update was successful, false otherwise.
 */
export const updateKnowledgeContent = async (
  id: Knowledge["id"],
  baseUrl: Knowledge["baseUrl"],
  markdown: string,
  markdownEmbedding: number[]
): Promise<boolean> => {
  const client = await getPgClient();
  const text =
    "UPDATE knowledge SET markdown=$1, markdown-embedding=$2 WHERE id=$3 AND baseUrl=$4";
  const values = [markdown, pgvector.toSql(markdownEmbedding), id, baseUrl];
  await client.query(text, values);
  return true;
};

// DELETE

/**
 * **DATABASE SERVICE**
 *
 * Deletes a knowledge entry from the database.
 *
 * @param {Knowledge["id"]} id - The ID of the knowledge entry to delete.
 * @param {Knowledge["baseUrl"]} baseUrl - The base URL associated with the knowledge entry.
 * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
 */
export const deleteKnowledge = async (
  id: Knowledge["id"],
  baseUrl: Knowledge["baseUrl"]
): Promise<boolean> => {
  const client = await getPgClient();
  const deleteQuery = "DELETE FROM knowledge WHERE id=$1 AND base_url=$2";
  const deleteValues = [id, baseUrl];
  await client.query(deleteQuery, deleteValues);
  return true;
};
