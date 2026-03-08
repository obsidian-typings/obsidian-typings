import {
    ToggleComponent
} from 'obsidian';
import type { ToggleComponentConstructor } from '../../../internals/constructors/augmentations/ToggleComponentConstructor.ts';

/**
 * Get the ToggleComponent constructor.
 *
 * @returns The ToggleComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getToggleComponentConstructor(): ToggleComponentConstructor {
    return ToggleComponent as ToggleComponentConstructor;
}
