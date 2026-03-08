import {
    RelativeDateValue
} from 'obsidian';
import type { RelativeDateValueConstructor } from '../../../internals/Constructors/augmentations/RelativeDateValueConstructor.ts';

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
