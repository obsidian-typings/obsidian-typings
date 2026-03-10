import {
  SliderComponent
} from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the SliderComponent constructor.
 *
 * @returns The SliderComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getSliderComponentConstructor(): ExtractConstructor<SliderComponent> {
  return SliderComponent as ExtractConstructor<SliderComponent>;
}
