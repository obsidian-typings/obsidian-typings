import { ToggleComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#ToggleComponent} constructor.
 *
 * @returns The {@link obsidian#ToggleComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getToggleComponentConstructor(): ExtractConstructor<ToggleComponent> {
  return ToggleComponent as ExtractConstructor<ToggleComponent>;
}
