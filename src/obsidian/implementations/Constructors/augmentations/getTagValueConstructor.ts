import {
    TagValue
} from 'obsidian';
import type { TagValueConstructor } from '../../../internals/Constructors/augmentations/TagValueConstructor.ts';

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
