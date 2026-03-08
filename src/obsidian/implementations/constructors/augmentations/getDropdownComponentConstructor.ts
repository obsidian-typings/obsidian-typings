import {
    DropdownComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type DropdownComponentConstructor = ExtractConstructor<DropdownComponent>;

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
