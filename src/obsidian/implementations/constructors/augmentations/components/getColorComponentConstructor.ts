import { ColorComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the ColorComponent constructor.
 *
 * @returns The ColorComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getColorComponentConstructor(): ExtractConstructor<ColorComponent> {
  return ColorComponent as ExtractConstructor<ColorComponent>;
}
