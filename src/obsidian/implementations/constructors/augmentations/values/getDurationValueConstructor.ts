import {
  DurationValue
} from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the DurationValue constructor.
 *
 * @returns The DurationValue constructor.
 *
 * @public
 * @unofficial
 */
export function getDurationValueConstructor(): ExtractConstructor<DurationValue> {
  return DurationValue as ExtractConstructor<DurationValue>;
}
