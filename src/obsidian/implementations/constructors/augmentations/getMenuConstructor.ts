import {
  Menu
} from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the Menu constructor.
 *
 * @returns The Menu constructor.
 *
 * @public
 * @unofficial
 */
export function getMenuConstructor(): ExtractConstructor<Menu> {
  return Menu as ExtractConstructor<Menu>;
}
