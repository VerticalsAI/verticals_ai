import { Connection } from "@solana/web3.js";
import {
  BaseAction,
  BaseActionResult,
  BaseActionSchemaAny,
} from "../../base-action";

export type SeiActionSchemaAny = BaseActionSchemaAny;
export type SeiActionResult<TBody> = BaseActionResult<TBody>;

/**
 * Represents the structure for Solana Actions.
 */
export interface SeiAction<TActionSchema extends SeiActionSchemaAny, TBody>
  extends BaseAction<TActionSchema, TBody, Connection> {}
