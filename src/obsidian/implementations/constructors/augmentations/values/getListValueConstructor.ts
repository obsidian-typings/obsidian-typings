import { ListValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#ListValue} constructor.
 *
 * @returns The {@link obsidian#ListValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getListValueConstructor(): ExtractConstructor<ListValue> {
  return ListValue as ExtractConstructor<ListValue>;
}
