import {
  NotNullValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the NotNullValue constructor.
 *
 * @returns The NotNullValue constructor.
 *
 * @public
 * @unofficial
 */
export function getNotNullValueConstructor(): ExtractConstructor<NotNullValue> {
  return NotNullValue as unknown as ExtractConstructor<NotNullValue>;
}
