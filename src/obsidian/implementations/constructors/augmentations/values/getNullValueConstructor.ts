import {
  NullValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type NullValueConstructor = ExtractConstructor<NullValue>;

/**
 * Get the NullValue constructor.
 *
 * @returns The NullValue constructor.
 *
 * @public
 * @unofficial
 */
export function getNullValueConstructor(): NullValueConstructor {
  return NullValue as NullValueConstructor;
}
