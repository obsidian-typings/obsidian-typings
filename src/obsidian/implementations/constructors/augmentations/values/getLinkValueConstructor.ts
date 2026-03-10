import {
  LinkValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type LinkValueConstructor = ExtractConstructor<LinkValue>;

/**
 * Get the LinkValue constructor.
 *
 * @returns The LinkValue constructor.
 *
 * @public
 * @unofficial
 */
export function getLinkValueConstructor(): LinkValueConstructor {
  return LinkValue as unknown as LinkValueConstructor;
}
