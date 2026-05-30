import { DurationValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#DurationValue} constructor.
 *
 * @returns The {@link obsidian#DurationValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getDurationValueConstructor(): ExtractConstructor<DurationValue> {
  return DurationValue as ExtractConstructor<DurationValue>;
}
