import {
  ColorComponent
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type ColorComponentConstructor = ExtractConstructor<ColorComponent>;

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
