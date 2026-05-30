import { MenuSeparator } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#MenuSeparator} constructor.
 *
 * @returns The {@link obsidian#MenuSeparator} constructor.
 *
 * @public
 * @unofficial
 */
export function getMenuSeparatorConstructor(): ExtractConstructor<MenuSeparator> {
  return MenuSeparator as ExtractConstructor<MenuSeparator>;
}
