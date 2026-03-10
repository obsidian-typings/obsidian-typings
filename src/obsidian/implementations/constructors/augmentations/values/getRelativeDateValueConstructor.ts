import {
  RelativeDateValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the RelativeDateValue constructor.
 *
 * @returns The RelativeDateValue constructor.
 *
 * @public
 * @unofficial
 */
export function getRelativeDateValueConstructor(): ExtractConstructor<RelativeDateValue> {
  return RelativeDateValue as ExtractConstructor<RelativeDateValue>;
}
