import {
    LinkValue
} from 'obsidian';
import type { LinkValueConstructor } from '../../../internals/constructors/augmentations/LinkValueConstructor.d.ts';

/**
 * Get the LinkValue constructor.
 *
 * @returns The LinkValue constructor.
 *
 * @public
 * @unofficial
 */
export function getLinkValueConstructor(): LinkValueConstructor {
    return LinkValue as LinkValueConstructor;
}
