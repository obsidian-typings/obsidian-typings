import {
    MenuItem
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the MenuItem constructor.
 *
 * @returns The MenuItem constructor.
 *
 * @public
 * @unofficial
 */
export function getMenuItemConstructor(): ExtractConstructor<MenuItem> {
    return MenuItem as unknown as ExtractConstructor<MenuItem>;
}
