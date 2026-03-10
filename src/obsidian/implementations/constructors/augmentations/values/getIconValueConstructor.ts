import {
  IconValue
} from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the IconValue constructor.
 *
 * @returns The IconValue constructor.
 *
 * @public
 * @unofficial
 */
export function getIconValueConstructor(): ExtractConstructor<IconValue> {
  return IconValue as ExtractConstructor<IconValue>;
}
