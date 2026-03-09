import {
    Editor
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type EditorConstructor = ExtractConstructor<Editor>;

/**
 * Get the Editor constructor.
 *
 * @returns The Editor constructor.
 *
 * @public
 * @unofficial
 */
export function getEditorConstructor(): EditorConstructor {
    return Editor as EditorConstructor;
}
