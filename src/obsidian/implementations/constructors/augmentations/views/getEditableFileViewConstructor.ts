import {
  EditableFileView
} from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the EditableFileView constructor.
 *
 * @returns The EditableFileView constructor.
 *
 * @public
 * @unofficial
 */
export function getEditableFileViewConstructor(): ExtractConstructor<EditableFileView> {
  return EditableFileView as ExtractConstructor<EditableFileView>;
}
