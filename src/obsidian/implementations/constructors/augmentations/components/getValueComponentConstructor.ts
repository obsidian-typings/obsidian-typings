import { ValueComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the ValueComponent constructor.
 *
 * @returns The ValueComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getValueComponentConstructor(): ExtractConstructor<ValueComponent<unknown>> {
  return ValueComponent as ExtractConstructor<ValueComponent<unknown>>;
}
