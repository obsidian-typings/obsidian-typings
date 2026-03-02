import type { ChangeDesc } from '@codemirror/state';
import type { EditorPosition } from 'obsidian';
import type { CodeMirrorEditor } from './CodeMirrorEditor.d.ts';

/**
 * A bookmark marking a specific position in the editor document that tracks changes.
 * @public
 * @unofficial
 */
export interface Bookmark {
    /** Association direction for the bookmark (-1 for left, 1 for right). */
    assoc: number;

    /** The CodeMirror editor instance this bookmark belongs to. */
    cm: CodeMirrorEditor;

    /** Unique identifier for this bookmark. */
    id: number;

    /** Character offset of the bookmark within its line. */
    offset: number;

    /** Remove this bookmark from the editor. */
    clear(): void;

    /** Find the current position of this bookmark, or null if cleared. */
    find(): EditorPosition | null;

    /** Update the bookmark position in response to a document change. */
    update(changeDesc: ChangeDesc): void;
}
