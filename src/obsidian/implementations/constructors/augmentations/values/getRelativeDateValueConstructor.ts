import {
  RelativeDateValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type RelativeDateValueConstructor = ExtractConstructor<RelativeDateValue>;

/**
 * Get the RelativeDateValue constructor.
 *
 * @returns The RelativeDateValue constructor.
 *
 * @public
 * @unofficial
 */
export function getRelativeDateValueConstructor(): RelativeDateValueConstructor {
  return RelativeDateValue as RelativeDateValueConstructor;
}
