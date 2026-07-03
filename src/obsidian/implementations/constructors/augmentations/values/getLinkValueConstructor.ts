import { LinkValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#LinkValue} constructor.
 *
 * @returns The {@link obsidian#LinkValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getLinkValueConstructor(): ExtractConstructor<LinkValue> {
  return LinkValue as unknown as ExtractConstructor<LinkValue>;
}
