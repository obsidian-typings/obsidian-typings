import {
  LinkValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the LinkValue constructor.
 *
 * @returns The LinkValue constructor.
 *
 * @public
 * @unofficial
 */
export function getLinkValueConstructor(): ExtractConstructor<LinkValue> {
  return LinkValue as unknown as ExtractConstructor<LinkValue>;
}
