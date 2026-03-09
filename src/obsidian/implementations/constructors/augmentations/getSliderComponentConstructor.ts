import {
  SliderComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type SliderComponentConstructor = ExtractConstructor<SliderComponent>;

/**
 * Get the SliderComponent constructor.
 *
 * @returns The SliderComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getSliderComponentConstructor(): SliderComponentConstructor {
  return SliderComponent as SliderComponentConstructor;
}
