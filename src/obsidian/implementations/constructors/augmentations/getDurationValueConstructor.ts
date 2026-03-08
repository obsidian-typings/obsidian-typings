import {
    DurationValue
} from 'obsidian';
import type { DurationValueConstructor } from '../../../internals/constructors/augmentations/DurationValueConstructor.d.ts';

/**
 * Get the DurationValue constructor.
 *
 * @returns The DurationValue constructor.
 *
 * @public
 * @unofficial
 */
export function getDurationValueConstructor(): DurationValueConstructor {
    return DurationValue as DurationValueConstructor;
}
