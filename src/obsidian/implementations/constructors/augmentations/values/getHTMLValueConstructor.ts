import { HTMLValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#HTMLValue} constructor.
 *
 * @returns The {@link obsidian#HTMLValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getHTMLValueConstructor(): ExtractConstructor<HTMLValue> {
  return HTMLValue as ExtractConstructor<HTMLValue>;
}
