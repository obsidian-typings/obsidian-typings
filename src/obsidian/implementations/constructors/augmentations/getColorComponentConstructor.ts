import {
    ColorComponent
} from 'obsidian';
import type { ColorComponentConstructor } from '../../../internals/constructors/augmentations/ColorComponentConstructor.d.ts';

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
