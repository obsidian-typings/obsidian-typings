import { DropdownComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#DropdownComponent} constructor.
 *
 * @returns The {@link obsidian#DropdownComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getDropdownComponentConstructor(): ExtractConstructor<DropdownComponent> {
  return DropdownComponent as ExtractConstructor<DropdownComponent>;
}
