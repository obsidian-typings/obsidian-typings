import {
  TagValue
} from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the TagValue constructor.
 *
 * @returns The TagValue constructor.
 *
 * @public
 * @unofficial
 */
export function getTagValueConstructor(): ExtractConstructor<TagValue> {
  return TagValue as ExtractConstructor<TagValue>;
}
