import { SliderComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#SliderComponent} constructor.
 *
 * @returns The {@link obsidian#SliderComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getSliderComponentConstructor(): ExtractConstructor<SliderComponent> {
  return SliderComponent as ExtractConstructor<SliderComponent>;
}
