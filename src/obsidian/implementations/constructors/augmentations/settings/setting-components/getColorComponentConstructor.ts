import { ColorComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#ColorComponent} constructor.
 *
 * @returns The {@link obsidian#ColorComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getColorComponentConstructor(): ExtractConstructor<ColorComponent> {
  return ColorComponent as ExtractConstructor<ColorComponent>;
}
