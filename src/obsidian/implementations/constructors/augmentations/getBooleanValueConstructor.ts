import {
    BooleanValue
} from 'obsidian';
import type { BooleanValueConstructor } from '../../../internals/constructors/augmentations/BooleanValueConstructor.d.ts';

/**
 * Get the BooleanValue constructor.
 *
 * @returns The BooleanValue constructor.
 *
 * @public
 * @unofficial
 */
export function getBooleanValueConstructor(): BooleanValueConstructor {
    return BooleanValue as BooleanValueConstructor;
}
