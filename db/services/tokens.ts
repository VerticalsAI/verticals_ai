import "server-only";

import { getPgClient } from "../pg-client";
import { Token } from "../types";

export const convertRowToToken = (data: any): Token => {
  return {
    id: data.id,
    name: data.name,
    symbol: data.symbol,
    decimals: data.decimals,
    tags: data.tags,
    logoURI: data.logo_uri,
    freezeAuthority: data.freeze_authority,
    mintAuthority: data.mint_authority,
    permanentDelegate: data.permanent_delegate,
    extensions: JSON.parse(data.extensions),
  };
};

// CREATE

/**
 * **DATABASE SERVICE**
 *
 * Adds a new chat to the database.
 *
 * @param {Token} token - The token data to be added.
 * @returns {Promise<Token | null>} The newly created token or null if creation failed.
 */
export const addToken = async (token: Token): Promise<Token | null> => {
  const client = await getPgClient();
  const text =
    "INSERT INTO token(id, name, symbol, decimals, tags, logo_uri, freeze_authority, mint_authority, permanent_delegate, extensions) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
  const values = [
    token.id,
    token.name,
    token.symbol.toLowerCase(),
    token.decimals,
    token.tags,
    token.logoURI,
    token.freezeAuthority,
    token.mintAuthority,
    token.permanentDelegate,
    JSON.stringify(token.extensions),
  ];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return null;
  }
  return convertRowToToken(res.rows[0]);
};

// READ

/**
 * **DATABASE SERVICE**
 *
 * Retrieves a token by its ID.
 *
 * @param {Token["id"]} id - The ID of the token to retrieve.
 * @returns {Promise<Token | null>} The retrieved token or null if not found.
 */
export const getToken = async (id: Token["id"]): Promise<Token | null> => {
  const client = await getPgClient();
  const text = "SELECT * FROM token WHERE id=$1";
  const values = [id];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return null;
  }
  return convertRowToToken(res.rows[0]);
};

/**
 * **DATABASE SERVICE**
 *
 * Search tokens.
 * id, name, symbol, decimals, tags, logo_uri, freeze_authority, mint_authority, permanent_delegate, extensions
 * @returns {Promise<Token[]>} An array of tokens.
 */

export const searchTokens = async (keywords: string): Promise<Token[]> => {
  const client = await getPgClient();
  const text = `SELECT * FROM token WHERE id LIKE '%${keywords}%' OR name LIKE '%${keywords}%' OR symbol LIKE '%${keywords}%' ORDER BY created_at DESC`;
  const res = await client.query(text);
  if (res.rowCount == 0) {
    return [];
  }
  return res.rows.map((r) => convertRowToToken(r));
};

/**
 * **DATABASE SERVICE**
 *
 * Finds all tokens.
 *
 * @returns {Promise<Token[]>} An array of tokens.
 */
export const findTokens = async (): Promise<Token[]> => {
  const client = await getPgClient();
  const text = "SELECT * FROM token ORDER BY id";
  const res = await client.query(text);
  if (res.rowCount == 0) {
    return [];
  }
  return res.rows.map((r) => convertRowToToken(r));
};

/**
 * **DATABASE SERVICE**
 *
 * Finds all tokens by a symbol.
 *
 * @param {string} symbol - The symbol to search for.
 * @returns {Promise<Token[]>} An array of tokens.
 */
export const findTokensBySymbol = async (symbol: string): Promise<Token[]> => {
  const client = await getPgClient();
  const text = "SELECT * FROM token WHERE symbol=$1";
  const values = [symbol.toLowerCase()];
  const res = await client.query(text, values);
  if (res.rowCount == 0) {
    return [];
  }
  return res.rows.map((r) => convertRowToToken(r));
};

export const getTokenBySymbol = async (
  symbol: string
): Promise<Token | null> => {
  const tokens = await findTokensBySymbol(symbol);
  if (!tokens || tokens.length === 0) return null;
  if (tokens.length === 1) {
    return convertRowToToken(tokens[0]);
  } else {
    const verifiedToken = tokens.find((token) =>
      token.tags.includes("verified")
    );
    if (verifiedToken) {
      return convertRowToToken(verifiedToken);
    } else {
      const communityToken = tokens.find((token) =>
        token.tags.includes("community")
      );
      if (communityToken) {
        return convertRowToToken(communityToken);
      } else {
        return convertRowToToken(tokens[0]);
      }
    }
  }
};

// DELETE

/**
 * **DATABASE SERVICE**
 *
 * Deletes a token from the database.
 *
 * @param {Token["id"]} id - The ID of the token to delete.
 * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
 */
export const deleteToken = async (id: Token["id"]): Promise<boolean> => {
  const client = await getPgClient();
  const deleteQuery = "DELETE FROM token WHERE id=$1";
  const deleteValues = [id];
  await client.query(deleteQuery, deleteValues);
  return true;
};
