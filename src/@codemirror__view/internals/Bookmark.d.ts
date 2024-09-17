import { ChangeDesc } from '@codemirror/state';
import type { EditorPosition } from 'obsidian';
import type { CodeMirrorEditor } from './CodeMirrorEditor.js';

/**
 * @public
 */
export interface Bookmark {
    cm: CodeMirrorEditor;
    id: number;
    offset: number;
    assoc: number;

    clear(): void;
    find(): EditorPosition | null;
    update(changeDesc: ChangeDesc): void;
}
