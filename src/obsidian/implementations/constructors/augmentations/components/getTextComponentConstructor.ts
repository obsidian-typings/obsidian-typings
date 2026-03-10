import {
  TextComponent
} from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the TextComponent constructor.
 *
 * @returns The TextComponent constructor.
 *
 * @public
 * @unofficial
 */
export function getTextComponentConstructor(): ExtractConstructor<TextComponent> {
  return TextComponent as ExtractConstructor<TextComponent>;
}
