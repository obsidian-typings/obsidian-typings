import {
    Menu
} from 'obsidian';
import type { MenuConstructor } from '../../../internals/constructors/augmentations/MenuConstructor.ts';

/**
 * Get the Menu constructor.
 *
 * @returns The Menu constructor.
 *
 * @public
 * @unofficial
 */
export function getMenuConstructor(): MenuConstructor {
    return Menu as MenuConstructor;
}
