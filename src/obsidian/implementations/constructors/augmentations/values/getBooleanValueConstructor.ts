import { BooleanValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#BooleanValue} constructor.
 *
 * @returns The {@link obsidian#BooleanValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getBooleanValueConstructor(): ExtractConstructor<BooleanValue> {
  return BooleanValue as ExtractConstructor<BooleanValue>;
}
