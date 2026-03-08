import {
    MenuItem
} from 'obsidian';
import type { MenuItemConstructor } from '../../../internals/Constructors/augmentations/MenuItemConstructor.ts';

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
