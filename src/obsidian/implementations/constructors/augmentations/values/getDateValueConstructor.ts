import { DateValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#DateValue} constructor.
 *
 * @returns The {@link obsidian#DateValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getDateValueConstructor(): ExtractConstructor<DateValue> {
  return DateValue as ExtractConstructor<DateValue>;
}
