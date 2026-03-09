import {
  TagValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type TagValueConstructor = ExtractConstructor<TagValue>;

/**
 * Get the TagValue constructor.
 *
 * @returns The TagValue constructor.
 *
 * @public
 * @unofficial
 */
export function getTagValueConstructor(): TagValueConstructor {
  return TagValue as TagValueConstructor;
}
