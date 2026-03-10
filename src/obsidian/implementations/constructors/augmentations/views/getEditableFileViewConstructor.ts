import {
  EditableFileView
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type EditableFileViewConstructor = ExtractConstructor<EditableFileView>;

/**
 * Get the EditableFileView constructor.
 *
 * @returns The EditableFileView constructor.
 *
 * @public
 * @unofficial
 */
export function getEditableFileViewConstructor(): EditableFileViewConstructor {
  return EditableFileView as EditableFileViewConstructor;
}
