import { NumberValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#NumberValue} constructor.
 *
 * @returns The {@link obsidian#NumberValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getNumberValueConstructor(): ExtractConstructor<NumberValue> {
  return NumberValue as ExtractConstructor<NumberValue>;
}
