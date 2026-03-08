import {
    NumberValue
} from 'obsidian';
import type { NumberValueConstructor } from '../../../internals/constructors/augmentations/NumberValueConstructor.d.ts';

/**
 * Get the NumberValue constructor.
 *
 * @returns The NumberValue constructor.
 *
 * @public
 * @unofficial
 */
export function getNumberValueConstructor(): NumberValueConstructor {
    return NumberValue as NumberValueConstructor;
}
