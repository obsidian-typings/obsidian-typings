import { TextComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#TextComponent} constructor.
 *
 * @returns The {@link obsidian#TextComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getTextComponentConstructor(): ExtractConstructor<TextComponent> {
  return TextComponent as ExtractConstructor<TextComponent>;
}
