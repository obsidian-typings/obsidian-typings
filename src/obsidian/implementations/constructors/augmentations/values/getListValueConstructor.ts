import { ListValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the ListValue constructor.
 *
 * @returns The ListValue constructor.
 *
 * @public
 * @unofficial
 */
export function getListValueConstructor(): ExtractConstructor<ListValue> {
  return ListValue as ExtractConstructor<ListValue>;
}
