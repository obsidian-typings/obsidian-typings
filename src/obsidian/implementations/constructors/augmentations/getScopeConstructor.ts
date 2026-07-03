import { Scope } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#Scope} constructor.
 *
 * @returns The {@link obsidian#Scope} constructor.
 *
 * @public
 * @unofficial
 */
export function getScopeConstructor(): ExtractConstructor<Scope> {
  return Scope as ExtractConstructor<Scope>;
}
