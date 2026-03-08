import {
    MenuItem
} from 'obsidian';
import type { MenuItemConstructor } from '../../../internals/constructors/augmentations/MenuItemConstructor.d.ts';

/**
 * Get the MenuItem constructor.
 *
 * @returns The MenuItem constructor.
 *
 * @public
 * @unofficial
 */
export function getMenuItemConstructor(): MenuItemConstructor {
    return MenuItem as unknown as MenuItemConstructor;
}
