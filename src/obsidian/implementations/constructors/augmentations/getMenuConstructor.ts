import {
    Menu
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type MenuConstructor = ExtractConstructor<Menu>;

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
