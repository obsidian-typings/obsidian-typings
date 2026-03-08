import {
    DropdownComponent
} from 'obsidian';
import type { DropdownComponentConstructor } from '../../../internals/constructors/augmentations/DropdownComponentConstructor.ts';

/**
 * Get the DropdownComponent constructor.
 *
 * @returns The DropdownComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getDropdownComponentConstructor(): DropdownComponentConstructor {
    return DropdownComponent as DropdownComponentConstructor;
}
