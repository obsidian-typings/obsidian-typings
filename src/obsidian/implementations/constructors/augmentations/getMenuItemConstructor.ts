import { MenuItem } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#MenuItem} constructor.
 *
 * @returns The {@link obsidian#MenuItem} constructor.
 *
 * @public
 * @unofficial
 */
export function getMenuItemConstructor(): ExtractConstructor<MenuItem> {
  return MenuItem as unknown as ExtractConstructor<MenuItem>;
}
