import { TextAreaComponent } from 'obsidian';

import type { ExtractConstructor } from '../../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#TextAreaComponent} constructor.
 *
 * @returns The {@link obsidian#TextAreaComponent} constructor.
 *
 * @public
 * @unofficial
 */
export function getTextAreaComponentConstructor(): ExtractConstructor<TextAreaComponent> {
  return TextAreaComponent as ExtractConstructor<TextAreaComponent>;
}
