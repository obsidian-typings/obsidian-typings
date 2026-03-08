import {
    MenuSeparator
} from 'obsidian';
import type { MenuSeparatorConstructor } from '../../../internals/constructors/augmentations/MenuSeparatorConstructor.ts';

/**
 * Get the MenuSeparator constructor.
 *
 * @returns The MenuSeparator constructor.
 *
 * @public
 * @unofficial
 */
export function getMenuSeparatorConstructor(): MenuSeparatorConstructor {
    return MenuSeparator as MenuSeparatorConstructor;
}
