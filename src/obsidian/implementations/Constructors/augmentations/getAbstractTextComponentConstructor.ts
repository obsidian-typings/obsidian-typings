import {
    AbstractTextComponent
} from 'obsidian';
import type { AbstractTextComponentConstructor } from '../../../internals/Constructors/augmentations/AbstractTextComponentConstructor.ts';

/**
 * Get the AbstractTextComponent constructor.
 *
 * @returns The AbstractTextComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getAbstractTextComponentConstructor(): AbstractTextComponentConstructor {
    return AbstractTextComponent as AbstractTextComponentConstructor;
}
