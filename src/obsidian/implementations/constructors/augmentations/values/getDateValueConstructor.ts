import {
  DateValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the DateValue constructor.
 *
 * @returns The DateValue constructor.
 *
 * @public
 * @unofficial
 */
export function getDateValueConstructor(): ExtractConstructor<DateValue> {
  return DateValue as ExtractConstructor<DateValue>;
}
