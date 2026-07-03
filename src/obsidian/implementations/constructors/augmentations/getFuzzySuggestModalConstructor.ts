import { FuzzySuggestModal } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#FuzzySuggestModal} constructor.
 *
 * @returns The {@link obsidian#FuzzySuggestModal} constructor.
 *
 * @public
 * @unofficial
 */
export function getFuzzySuggestModalConstructor(): ExtractConstructor<FuzzySuggestModal<unknown>> {
  return FuzzySuggestModal as ExtractConstructor<FuzzySuggestModal<unknown>>;
}
