import {
  ListValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type ListValueConstructor = ExtractConstructor<ListValue>;

/**
 * Get the ListValue constructor.
 *
 * @returns The ListValue constructor.
 *
 * @public
 * @unofficial
 */
export function getListValueConstructor(): ListValueConstructor {
  return ListValue as ListValueConstructor;
}
