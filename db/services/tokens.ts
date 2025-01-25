import "server-only";

import { Token } from "../types";
import { getPgClient } from "../pg-client";

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
    const client = await getPgClient()
    const text = 'INSERT INTO token(id, name, symbol, decimals, tags, logo_uri, freeze_authority, mint_authority, permanent_delegate, extensions) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *'
    const values = [token.id,
                        token.name,
                        token.symbol.toLowerCase(),
                        token.decimals,
                        token.tags,
                        token.logoURI,
                        token.freezeAuthority,
                        token.mintAuthority,
                        token.permanentDelegate,
                        JSON.stringify(token.extensions)]
    const res = await client.query<Token>(text, values)
    return res.rows[0]
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
    const client = await getPgClient()
    const text = 'SELECT * FROM token WHERE id=$1'
    const values = [id]
    const res = await client.query<Token>(text, values)
    return res.rows[0]
};

/**
 * **DATABASE SERVICE**
 * 
 * Finds all tokens.
 * 
 * @returns {Promise<Token[]>} An array of tokens.
 */
export const findTokens = async (): Promise<Token[]> => {
    const client = await getPgClient()
    const text = 'SELECT * FROM token ORDER BY id'
    const res = await client.query<Token>(text)
    return res.rows
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
    const client = await getPgClient()
    const text = 'SELECT * FROM token WHERE symbol=$1'
    const values = [symbol.toLowerCase()]
    const res = await client.query<Token>(text, values)
    return res.rows
};

export const getTokenBySymbol = async (symbol: string): Promise<Token | null> => {
    const tokens = await findTokensBySymbol(symbol)
    if (!tokens || tokens.length === 0) return null;
    if (tokens.length === 1) {
        return tokens[0];
    } else {
        const verifiedToken = tokens.find(token => token.tags.includes("verified"));
        if(verifiedToken) {
            return verifiedToken;
        } else {
            const communityToken = tokens.find(token => token.tags.includes("community"));
            if(communityToken) {
                return communityToken;
            } else {
                return tokens[0];
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
    const client = await getPgClient()
    const deleteQuery = 'DELETE FROM token WHERE id=$1'
    const deleteValues = [id]
    await client.query<Token>(deleteQuery, deleteValues)
    return true
};