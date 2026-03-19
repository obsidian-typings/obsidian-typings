import { Scope } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the Scope constructor.
 *
 * @returns The Scope constructor.
 *
 * @public
 * @unofficial
 */
export function getScopeConstructor(): ExtractConstructor<Scope> {
  return Scope as ExtractConstructor<Scope>;
}
