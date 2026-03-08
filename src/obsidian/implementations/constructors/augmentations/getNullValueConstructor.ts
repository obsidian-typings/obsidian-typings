import {
    NullValue
} from 'obsidian';
import type { NullValueConstructor } from '../../../internals/constructors/augmentations/NullValueConstructor.d.ts';

/**
 * Get the NullValue constructor.
 *
 * @returns The NullValue constructor.
 *
 * @public
 * @unofficial
 */
export function getNullValueConstructor(): NullValueConstructor {
    return NullValue as NullValueConstructor;
}
