import {
    DurationValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type DurationValueConstructor = ExtractConstructor<DurationValue>;

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
