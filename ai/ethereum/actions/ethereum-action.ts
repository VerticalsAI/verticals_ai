import { Connection } from "@solana/web3.js";
import {
  BaseAction,
  BaseActionResult,
  BaseActionSchemaAny,
} from "../../base-action";

export type EthereumActionSchemaAny = BaseActionSchemaAny;
export type EthereumActionResult<TBody> = BaseActionResult<TBody>;

/**
 * Represents the structure for Solana Actions.
 */
export interface EthereumAction<
  TActionSchema extends EthereumActionSchemaAny,
  TBody
> extends BaseAction<TActionSchema, TBody, Connection> {}
