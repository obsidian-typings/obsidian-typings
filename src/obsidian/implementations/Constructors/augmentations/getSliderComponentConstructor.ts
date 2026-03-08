import {
    SliderComponent
} from 'obsidian';
import type { SliderComponentConstructor } from '../../../internals/Constructors/augmentations/SliderComponentConstructor.ts';

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
