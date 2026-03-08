import {
    DropdownComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the DropdownComponent constructor.
 *
 * @returns The DropdownComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getDropdownComponentConstructor(): ExtractConstructor<DropdownComponent> {
    return DropdownComponent as ExtractConstructor<DropdownComponent>;
}
