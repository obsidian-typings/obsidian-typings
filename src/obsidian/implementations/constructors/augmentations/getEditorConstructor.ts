import { Editor } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#Editor} constructor.
 *
 * @returns The {@link obsidian#Editor} constructor.
 *
 * @public
 * @unofficial
 */
export function getEditorConstructor(): ExtractConstructor<Editor> {
  return Editor as ExtractConstructor<Editor>;
}
