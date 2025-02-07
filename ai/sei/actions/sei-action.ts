import { Connection } from "@solana/web3.js";
import {
  BaseAction,
  BaseActionResult,
  BaseActionSchemaAny,
} from "../../base-action";

export type EVMActionSchemaAny = BaseActionSchemaAny;
export type EVMActionResult<TBody> = BaseActionResult<TBody>;

/**
 * Represents the structure for Solana Actions.
 */
export interface EVMAction<TActionSchema extends EVMActionSchemaAny, TBody>
  extends BaseAction<TActionSchema, TBody, Connection> {}
