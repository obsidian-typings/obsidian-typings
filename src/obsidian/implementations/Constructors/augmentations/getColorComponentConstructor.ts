import {
    ColorComponent
} from 'obsidian';
import type { ColorComponentConstructor } from '../../../internals/Constructors/augmentations/ColorComponentConstructor.ts';

/**
 * Get the ColorComponent constructor.
 *
 * @returns The ColorComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getColorComponentConstructor(): ColorComponentConstructor {
    return ColorComponent as ColorComponentConstructor;
}
