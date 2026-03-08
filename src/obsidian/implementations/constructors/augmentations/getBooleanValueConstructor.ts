import {
    BooleanValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type BooleanValueConstructor = ExtractConstructor<BooleanValue>;

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
