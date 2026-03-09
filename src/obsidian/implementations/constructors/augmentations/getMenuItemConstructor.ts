import {
  MenuItem
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type MenuItemConstructor = ExtractConstructor<MenuItem>;

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
