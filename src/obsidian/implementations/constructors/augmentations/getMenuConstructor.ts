import { Menu } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#Menu} constructor.
 *
 * @returns The {@link obsidian#Menu} constructor.
 *
 * @public
 * @unofficial
 */
export function getMenuConstructor(): ExtractConstructor<Menu> {
  return Menu as ExtractConstructor<Menu>;
}
