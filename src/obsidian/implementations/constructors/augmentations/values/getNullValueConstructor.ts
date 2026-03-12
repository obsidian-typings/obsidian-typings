import { NullValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the NullValue constructor.
 *
 * @returns The NullValue constructor.
 *
 * @public
 * @unofficial
 */
export function getNullValueConstructor(): ExtractConstructor<NullValue> {
  return NullValue as ExtractConstructor<NullValue>;
}
