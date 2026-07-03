import { RegExpValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#RegExpValue} constructor.
 *
 * @returns The {@link obsidian#RegExpValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getRegExpValueConstructor(): ExtractConstructor<RegExpValue> {
  return RegExpValue as ExtractConstructor<RegExpValue>;
}
