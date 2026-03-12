import { Editor } from 'obsidian';

import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the Editor constructor.
 *
 * @returns The Editor constructor.
 *
 * @public
 * @unofficial
 */
export function getEditorConstructor(): ExtractConstructor<Editor> {
  return Editor as ExtractConstructor<Editor>;
}
