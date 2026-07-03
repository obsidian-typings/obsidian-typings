import { NotNullValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#NotNullValue} constructor.
 *
 * @returns The {@link obsidian#NotNullValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getNotNullValueConstructor(): ExtractConstructor<NotNullValue> {
  return NotNullValue as unknown as ExtractConstructor<NotNullValue>;
}
