import { IconValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#IconValue} constructor.
 *
 * @returns The {@link obsidian#IconValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getIconValueConstructor(): ExtractConstructor<IconValue> {
  return IconValue as ExtractConstructor<IconValue>;
}
