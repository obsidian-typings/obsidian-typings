import {
    DurationValue
} from 'obsidian';
import type { DurationValueConstructor } from '../../../internals/Constructors/augmentations/DurationValueConstructor.ts';

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
