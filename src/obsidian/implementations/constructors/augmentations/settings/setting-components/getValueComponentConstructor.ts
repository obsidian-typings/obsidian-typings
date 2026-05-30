import { ValueComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#ValueComponent} constructor.
 *
 * @returns The {@link obsidian#ValueComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getValueComponentConstructor(): ExtractConstructor<ValueComponent<unknown>> {
  return ValueComponent as ExtractConstructor<ValueComponent<unknown>>;
}
