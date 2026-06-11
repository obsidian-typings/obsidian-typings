import { DisplayValueComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#DisplayValueComponent} constructor.
 *
 * @returns The {@link obsidian#DisplayValueComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getDisplayValueComponentConstructor(): ExtractConstructor<DisplayValueComponent> {
  return DisplayValueComponent as ExtractConstructor<DisplayValueComponent>;
}
